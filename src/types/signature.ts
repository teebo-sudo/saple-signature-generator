export const SAPLE_LOGO_URL =
  "https://raw.githubusercontent.com/teebo-sudo/saple-signature-generator/main/public/saple-logo.png";

export interface SignatureData {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  logoUrl: string;
  logoBase64: string;
  primaryColor: string;
  accentColor: string;
  template: "classic" | "modern" | "minimal";
}

export const defaultSignatureData: SignatureData = {
  name: "Arne Kabelitz",
  title: "Head of Marketing",
  company: "SAPLE",
  email: "arne@saple.de",
  phone: "+49 (0) 152 224 238 53",
  website: "www.saple.de",
  address: "",
  linkedin: "",
  twitter: "",
  instagram: "",
  logoUrl: SAPLE_LOGO_URL,
  logoBase64: "",
  primaryColor: "#000000",
  accentColor: "#ffd731",
  template: "classic",
};
