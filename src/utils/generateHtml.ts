// ... imports remain the same

export function generateHtml(
  data: SignatureData,
  style: SignatureStyle,
  template: SignatureTemplate
): string {
  // ... previous code remains the same until contact info section

  const renderContactInfo = (icon: string, text: string, href: string) => `
    <tr>
      <td style="padding: 2px 0; ${isVertical ? 'text-align: center;' : ''}">
        <a href="${href}" style="
          color: #666666;
          text-decoration: none;
          ${template.showIcons ? 'display: flex; align-items: center; gap: 8px;' : ''}
        ">
          ${template.showIcons ? `
            <img src="${icon}" alt="" style="
              width: 14px;
              height: 14px;
              border: 0;
            " />
          ` : ''}
          ${text}
        </a>
      </td>
    </tr>
  `;

  // Update the contact info section in the HTML template
  const contactInfoSection = `
    <table cellpadding="0" cellspacing="0" border="0" ${isVertical ? 'align="center"' : ''}>
      ${data.email ? renderContactInfo(
        'https://cdn2.hubspot.net/hubfs/521324/icons/email.png',
        data.email,
        `mailto:${data.email}`
      ) : ''}
      ${data.phone ? renderContactInfo(
        'https://cdn2.hubspot.net/hubfs/521324/icons/phone.png',
        data.phone,
        `tel:${data.phone}`
      ) : ''}
      ${data.website ? renderContactInfo(
        'https://cdn2.hubspot.net/hubfs/521324/icons/website.png',
        data.website,
        data.website
      ) : ''}
    </table>
  `;

  // ... rest of the code remains the same
}