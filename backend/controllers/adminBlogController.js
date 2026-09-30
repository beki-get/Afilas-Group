import AppError from "../utils/AppError.js";
import { prisma } from "../utils/prisma.js";

const VALID_PILLARS = ["HOSPITAL", "DIAGNOSIS", "PHARMA"];
const VALID_STATUSES = ["DRAFT", "PUBLISHED"];

const normalizeString = (value) =>
  typeof value === "string" ? value.trim() : "";

const slugify = (value) => {
  const base = normalizeString(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return base || "post";
};

const ensureUniqueSlug = async (title, currentId = null) => {
  const base = slugify(title);
  let candidate = base;
  let attempts = 0;

  while (true) {
    const existing = await prisma.blogPost.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });

    if (!existing || existing.id === currentId) {
      return candidate;
    }

    attempts += 1;
    candidate = `${base}-${Math.random().toString(36).slice(2, 8)}`;

    if (attempts > 30) {
      candidate = `${base}-${Date.now().toString(36)}`;
      const fallback = await prisma.blogPost.findUnique({
        where: { slug: candidate },
        select: { id: true },
      });

      if (!fallback || fallback.id === currentId) {
        return candidate;
      }
    }
  }
};

const parseValidation = (value, fieldName, validValues) => {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const normalized = String(value).trim().toUpperCase();

  if (!validValues.includes(normalized)) {
    throw new AppError(
      `${fieldName} must be one of: ${validValues.join(", ")}`,
      400,
    );
  }

  return normalized;
};

export const createBlogPost = async (req, res, next) => {
  try {
    const pillar = parseValidation(req.body?.pillar, "pillar", VALID_PILLARS);
    const title = normalizeString(req.body?.title);
    const content = normalizeString(req.body?.content);
    const status =
      parseValidation(req.body?.status, "status", VALID_STATUSES) ?? "DRAFT";
    const coverImageUrl = normalizeString(req.body?.coverImageUrl);

    if (!pillar) {
      throw new AppError("pillar is required", 400);
    }

    if (!title) {
      throw new AppError("title is required", 400);
    }

    if (!content) {
      throw new AppError("content is required", 400);
    }

    const slug = await ensureUniqueSlug(title);

    const post = await prisma.blogPost.create({
      data: {
        pillar,
        title,
        slug,
        content,
        coverImageUrl: coverImageUrl || null,
        status,
        publishedAt: status === "PUBLISHED" ? new Date() : null,
      },
    });

    res.status(201).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const listBlogPostsAdmin = async (req, res, next) => {
  try {
    const pillar = parseValidation(req.query?.pillar, "pillar", VALID_PILLARS);
    const status = parseValidation(req.query?.status, "status", VALID_STATUSES);
    const search = normalizeString(req.query?.search);
    const requestedPage = Number(req.query?.page ?? 1);
    const requestedLimit = Number(req.query?.limit ?? 10);
    const page = Number.isFinite(requestedPage)
      ? Math.max(1, requestedPage)
      : 1;
    const limit = Number.isFinite(requestedLimit)
      ? Math.min(50, Math.max(1, requestedLimit))
      : 10;

    if (!pillar) {
      throw new AppError("pillar is required", 400);
    }

    const where = {
      pillar,
      ...(status ? { status } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { content: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    };

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.blogPost.count({ where }),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / limit));

    res.json({
      success: true,
      data: {
        posts,
        total,
        page,
        totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getBlogPostAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!post) {
      throw new AppError("Blog post not found", 404);
    }

    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const updateBlogPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await prisma.blogPost.findUnique({ where: { id } });

    if (!existing) {
      throw new AppError("Blog post not found", 404);
    }

    const title =
      req.body?.title !== undefined
        ? normalizeString(req.body.title)
        : existing.title;
    const content =
      req.body?.content !== undefined
        ? normalizeString(req.body.content)
        : existing.content;
    const coverImageUrl =
      req.body?.coverImageUrl !== undefined
        ? normalizeString(req.body.coverImageUrl)
        : existing.coverImageUrl;
    const status =
      req.body?.status !== undefined
        ? parseValidation(req.body.status, "status", VALID_STATUSES)
        : existing.status;

    if (!title) {
      throw new AppError("title is required", 400);
    }

    if (!content) {
      throw new AppError("content is required", 400);
    }

    const updateData = {
      title,
      content,
      coverImageUrl: coverImageUrl || null,
      status,
    };

    if (title !== existing.title) {
      updateData.slug = await ensureUniqueSlug(title, id);
    }

    if (
      status === "PUBLISHED" &&
      existing.status !== "PUBLISHED" &&
      !existing.publishedAt
    ) {
      updateData.publishedAt = new Date();
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: updateData,
    });

    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const deleteBlogPost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await prisma.blogPost.findUnique({ where: { id } });

    if (!post) {
      throw new AppError("Blog post not found", 404);
    }

    await prisma.blogPost.delete({ where: { id } });

    res.json({ success: true, data: { id } });
  } catch (error) {
    next(error);
  }
};
