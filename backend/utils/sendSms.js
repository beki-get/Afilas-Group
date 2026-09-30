import "dotenv/config";
import AfricasTalking from "africastalking";

const africastalking = AfricasTalking({
  apiKey: process.env.AFRICASTALKING_API_KEY,
  username: process.env.AFRICASTALKING_USERNAME,
});

const sms = africastalking.SMS;

const normalizePhone = (phone) => {
  const compactPhone = phone.replace(/[\s()-]/g, "");

  if (compactPhone.startsWith("0")) {
    return `+251${compactPhone.slice(1)}`;
  }

  if (compactPhone.startsWith("251")) {
    return `+${compactPhone}`;
  }

  return compactPhone;
};

export const sendSms = async (phone, message) => {
  await sms.send({
    to: [normalizePhone(phone)],
    message,
  });
};
