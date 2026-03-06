import { SignatureData } from "@/types/signature";
import { socialIcons } from "./social-icons";

export function classicTemplate(data: SignatureData, logoSrc: string): string {
  const {
    name,
    title,
    company,
    email,
    phone,
    website,
    address,
    linkedin,
    twitter,
    instagram,
    primaryColor,
    accentColor,
  } = data;

  const socialLinks = [
    { url: linkedin, icon: socialIcons.linkedin(primaryColor) },
    { url: twitter, icon: socialIcons.twitter(primaryColor) },
    { url: instagram, icon: socialIcons.instagram(primaryColor) },
  ].filter((s) => s.url);

  const socialHtml = socialLinks.length
    ? `<tr><td style="padding-top:8px;">
        <table cellpadding="0" cellspacing="0" border="0"><tr>
        ${socialLinks
          .map(
            (s) =>
              `<td style="padding-right:8px;"><a href="${s.url}" target="_blank" style="text-decoration:none;">${s.icon}</a></td>`
          )
          .join("")}
        </tr></table>
      </td></tr>`
    : "";

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${primaryColor};line-height:1.4;">
  <tr>
    <td style="padding-bottom:8px;">
      <strong style="font-size:16px;color:${primaryColor};">${name}</strong>
    </td>
  </tr>
  ${
    title || company
      ? `<tr><td style="font-size:13px;color:#666;padding-bottom:12px;">${title}${title && company ? " | " : ""}${company}</td></tr>`
      : ""
  }
  <tr>
    <td style="border-top:2px solid ${accentColor};padding-top:12px;">
      <table cellpadding="0" cellspacing="0" border="0" style="font-size:13px;color:#444;">
        ${email ? `<tr><td style="padding-bottom:2px;"><a href="mailto:${email}" style="color:${primaryColor};text-decoration:none;">${email}</a></td></tr>` : ""}
        ${phone ? `<tr><td style="padding-bottom:2px;">${phone}</td></tr>` : ""}
        ${website ? `<tr><td style="padding-bottom:2px;"><a href="https://${website.replace(/^https?:\/\//, "")}" style="color:${primaryColor};text-decoration:none;">${website}</a></td></tr>` : ""}
        ${address ? `<tr><td style="padding-bottom:2px;color:#888;font-size:12px;">${address}</td></tr>` : ""}
        ${socialHtml}
      </table>
    </td>
  </tr>
  ${
    logoSrc
      ? `<tr><td style="padding-top:12px;"><img src="${logoSrc}" alt="${company || "Logo"}" style="height:40px;max-width:180px;object-fit:contain;" /></td></tr>`
      : ""
  }
</table>`;
}

export function classicPreview(
  data: SignatureData,
  logoSrc: string
): React.ReactNode {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: classicTemplate(data, logoSrc) }}
    />
  );
}
