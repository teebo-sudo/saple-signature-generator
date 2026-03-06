import { SignatureData } from "@/types/signature";
import { socialLabels } from "./social-icons";

export function modernTemplate(data: SignatureData, logoSrc: string): string {
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
    { url: linkedin, label: socialLabels.linkedin },
    { url: twitter, label: socialLabels.twitter },
    { url: instagram, label: socialLabels.instagram },
  ].filter((s) => s.url);

  const socialHtml = socialLinks.length
    ? `<tr><td style="padding-top:6px;font-size:11px;">
        ${socialLinks
          .map(
            (s) =>
              `<a href="${s.url}" target="_blank" style="color:${primaryColor};text-decoration:none;margin-right:10px;">${s.label}</a>`
          )
          .join("")}
      </td></tr>`
    : "";

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${primaryColor};line-height:1.4;">
  <tr>
    ${
      logoSrc
        ? `<td style="vertical-align:top;padding-right:16px;">
            <img src="${logoSrc}" alt="${company || "Logo"}" style="height:60px;max-width:60px;border-radius:8px;" />
          </td>`
        : ""
    }
    <td style="vertical-align:top;border-left:3px solid ${accentColor};padding-left:16px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding-bottom:4px;">
            <strong style="font-size:16px;color:${primaryColor};">${name}</strong>
          </td>
        </tr>
        ${
          title || company
            ? `<tr><td style="font-size:13px;color:#666;padding-bottom:10px;">${title}${title && company ? " &middot; " : ""}${company}</td></tr>`
            : ""
        }
        <tr>
          <td>
            <table cellpadding="0" cellspacing="0" border="0" style="font-size:12px;color:#555;">
              ${email ? `<tr><td style="padding-bottom:2px;"><a href="mailto:${email}" style="color:${primaryColor};text-decoration:none;">${email}</a></td></tr>` : ""}
              ${phone ? `<tr><td style="padding-bottom:2px;">${phone}</td></tr>` : ""}
              ${website ? `<tr><td style="padding-bottom:2px;"><a href="https://${website.replace(/^https?:\/\//, "")}" style="color:${primaryColor};text-decoration:none;">${website}</a></td></tr>` : ""}
              ${address ? `<tr><td style="padding-bottom:2px;color:#888;font-size:11px;">${address}</td></tr>` : ""}
              ${socialHtml}
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

export function modernPreview(
  data: SignatureData,
  logoSrc: string
): React.ReactNode {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: modernTemplate(data, logoSrc) }}
    />
  );
}
