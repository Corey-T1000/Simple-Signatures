import { SignatureData, SignatureStyle, SignatureTemplate } from '../types/signature';

export function generateHtml(
  data: SignatureData,
  style: SignatureStyle,
  template: SignatureTemplate
): string {
  const isVertical = template.layout === 'vertical';

  const renderContactInfo = (icon: string, text: string, href: string) => `
    <tr>
      <td style="padding: 2px 0; ${isVertical ? 'text-align: center;' : ''}">
        <a href="${href}" style="
          color: #666666;
          text-decoration: none;
          font-family: ${style.fontFamily}, Arial, sans-serif;
          font-size: 14px;
          line-height: 1.4;
        ">
          ${text}
        </a>
      </td>
    </tr>
  `;

  const html = `
    <table cellpadding="0" cellspacing="0" border="0" style="
      font-family: ${style.fontFamily}, Arial, sans-serif;
      color: ${style.primaryColor};
      ${isVertical ? 'text-align: center;' : ''}
    ">
      <tr>
        <td>
          ${data.email ? renderContactInfo('email', data.email, `mailto:${data.email}`) : ''}
          ${data.phone ? renderContactInfo('phone', data.phone, `tel:${data.phone}`) : ''}
          ${data.website ? renderContactInfo('website', data.website, data.website) : ''}
        </td>
      </tr>
    </table>
  `;

  return html;
}