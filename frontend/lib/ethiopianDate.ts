import Kenat, { monthNames } from "kenat";

const slotStartTimes: Record<string, string> = {
  "Morning (9AM–12PM)": "09:00",
  "Afternoon (12PM–4PM)": "12:00",
  "Evening (4PM–7PM)": "16:00",
};

export function toEthiopianDate(gregorianDate: string): string {
  const [year, month, day] = gregorianDate.slice(0, 10).split("-").map(Number);
  const ethiopianDate = new Kenat(
    new Date(year, month - 1, day),
  ).getEthiopian();
  const monthName = monthNames.english[ethiopianDate.month - 1];

  return `${monthName} ${ethiopianDate.day}, ${ethiopianDate.year} E.C.`;
}

export function toEthiopianTime(time24: string): string {
  const timeValue = slotStartTimes[time24] || time24;
  const timeMatch = timeValue.match(/^(\d{1,2}):(\d{2})$/);

  if (!timeMatch) {
    return "";
  }

  const gregorianHour = Number(timeMatch[1]);
  const minutes = timeMatch[2];
  const ethiopianHour = (gregorianHour - 6 + 24) % 24;
  const displayHour = ethiopianHour % 12 || 12;
  const period =
    gregorianHour >= 6 && gregorianHour < 18 ? "day time" : "night time";

  return `${displayHour}:${minutes} ${period}`;
}

export function formatEthiopianDateTime(
  gregorianDate: string,
  gregorianTime: string,
) {
  const ethiopianDate = toEthiopianDate(gregorianDate);
  const ethiopianTime = toEthiopianTime(gregorianTime);

  return ethiopianTime ? `${ethiopianDate} — ${ethiopianTime}` : ethiopianDate;
}
