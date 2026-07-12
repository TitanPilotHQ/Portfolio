import { Resend } from "resend";

export interface NotificationParams {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export interface NotificationResult {
  success: boolean;
  error?: string;
}

export interface NotificationProvider {
  send(params: NotificationParams): Promise<NotificationResult>;
}

const FROM_ADDRESS = "Titan Pilot <noreply@titanpilot.app>";

class ResendNotificationProvider implements NotificationProvider {
  private client: Resend;

  constructor(apiKey: string) {
    this.client = new Resend(apiKey);
  }

  async send(params: NotificationParams): Promise<NotificationResult> {
    try {
      const { error } = await this.client.emails.send({
        from: FROM_ADDRESS,
        to: params.to,
        subject: params.subject,
        html: params.html,
        text: params.text,
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  }
}

let cachedProvider: NotificationProvider | null = null;

export function getNotificationProvider(): NotificationProvider {
  if (cachedProvider) return cachedProvider;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured");
  cachedProvider = new ResendNotificationProvider(apiKey);
  return cachedProvider;
}
