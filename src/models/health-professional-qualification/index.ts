export interface Experience {
  title: string;
}

export interface Certification {
  title: string;
  issuer: string;
  month: string;
  year: string;
  description: string;
  supportingDocument?: string;
}
