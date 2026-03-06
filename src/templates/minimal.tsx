import { SignatureData } from "@/types/signature";
import { socialLabels } from "./social-icons";

export function minimalTemplate(data: SignatureData, logoSrc: string): string {
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

  const contactParts = [email, phone, website].filter(Boolean);
  const contactHtml = contactParts
    .map((part) => {
      if (part === email)
        return `<a href="mailto:${email}" style="color:${primaryColor};text-decoration:none;">${email}</a>`;
      if (part === website)
        return `<a href="https://${website.replace(/^https?:\/\//, "")}" style="color:${primaryColor};text-decoration:none;">${website}</a>`;
      return part;
    })
    .join(`<span style="color:${accentColor};padding:0 6px;">&middot;</span>`);

  const socialLinks = [
    { url: linkedin, label: socialLabels.linkedin },
    { url: twitter, label: socialLabels.twitter },
    { url: instagram, label: socialLabels.instagram },
  ].filter((s) => s.url);

  const socialHtml = socialLinks.length
    ? `<tr><td style="padding-top:4px;font-size:11px;">
        ${socialLinks
          .map(
            (s) =>
              `<a href="${s.url}" target="_blank" style="color:#999;text-decoration:none;margin-right:10px;">${s.label}</a>`
          )
          .join("")}
      </td></tr>`
    : "";

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${primaryColor};line-height:1.5;">
  <tr>
    <td>
      <strong style="font-size:14px;">${name}</strong>${title || company ? `<span style="color:#999;"> &mdash; ${title}${title && company ? ", " : ""}${company}</span>` : ""}
    </td>
  </tr>
  ${
    contactParts.length
      ? `<tr><td style="font-size:12px;padding-top:4px;">${contactHtml}</td></tr>`
      : ""
  }
  ${address ? `<tr><td style="font-size:11px;color:#999;padding-top:2px;">${address}</td></tr>` : ""}
  ${socialHtml}
  ${
    logoSrc
      ? `<tr><td style="padding-top:10px;"><img src="${logoSrc}" alt="${company || "Logo"}" style="height:28px;max-width:140px;opacity:0.7;" /></td></tr>`
      : ""
  }
</table>`;
}

export function minimalPreview(
  data: SignatureData,
  logoSrc: string
): React.ReactNode {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: minimalTemplate(data, logoSrc) }}
    />
  );
}
