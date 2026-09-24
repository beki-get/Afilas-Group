import express from 'express';
import AppError from './utils/AppError.js';
import hospitalRoutes from "./routes/hospitalRoutes.js";
import diagnosisRoutes from "./routes/diagnosisRoutes.js";
import pharmaRoutes from "./routes/pharmaRoutes.js";


const app = express();
const PORT = 5000;
app.use(express.json());
app.use("/api/book/hospital", hospitalRoutes);
app.use("/api/book/diagnoses", diagnosisRoutes);
app.use("/api/book/pharma", pharmaRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World! Running beautifully with ES Modules.');
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

  app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: err.isOperational ? err.message : "Something went wrong",
  });
});
