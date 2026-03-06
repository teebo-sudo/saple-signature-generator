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
  logoBase64: "",
  primaryColor: "#000000",
  accentColor: "#ffd731",
  template: "classic",
};
