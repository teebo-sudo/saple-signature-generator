import { SignatureData } from "@/types/signature";
import { socialIcons } from "./social-icons";

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
    .join(`<span style="color:${accentColor};padding:0 6px;">·</span>`);

  const socialLinks = [
    { url: linkedin, icon: socialIcons.linkedin("#999") },
    { url: twitter, icon: socialIcons.twitter("#999") },
    { url: instagram, icon: socialIcons.instagram("#999") },
  ].filter((s) => s.url);

  const socialHtml = socialLinks.length
    ? `<tr><td style="padding-top:6px;">
        <table cellpadding="0" cellspacing="0" border="0"><tr>
        ${socialLinks
          .map(
            (s) =>
              `<td style="padding-right:6px;"><a href="${s.url}" target="_blank" style="text-decoration:none;">${s.icon}</a></td>`
          )
          .join("")}
        </tr></table>
      </td></tr>`
    : "";

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${primaryColor};line-height:1.5;">
  <tr>
    <td>
      <strong style="font-size:14px;">${name}</strong>${title || company ? `<span style="color:#999;"> — ${title}${title && company ? ", " : ""}${company}</span>` : ""}
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
      ? `<tr><td style="padding-top:10px;"><img src="${logoSrc}" alt="${company || "Logo"}" style="height:28px;max-width:140px;object-fit:contain;opacity:0.7;" /></td></tr>`
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
