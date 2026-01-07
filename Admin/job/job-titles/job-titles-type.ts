export type JobTitleType = {
  name: string;
  description: string;
  note: string;
  file: { name: string; mimeType: string; buffer: Buffer } | null;
};

