import { Input } from './ui/input';
import { Label } from './ui/label';
import { SignatureData } from '../types/signature';

interface SignatureFormProps {
  data: SignatureData;
  onChange: (data: SignatureData) => void;
}

export function SignatureForm({ data, onChange }: SignatureFormProps) {
  const handleChange = (field: keyof SignatureData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...data, [field]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Full Name</Label>
        <Input
          placeholder="John Doe"
          value={data.fullName}
          onChange={handleChange('fullName')}
        />
      </div>

      <div className="space-y-2">
        <Label>Job Title</Label>
        <Input
          placeholder="Software Engineer"
          value={data.jobTitle}
          onChange={handleChange('jobTitle')}
        />
      </div>

      <div className="space-y-2">
        <Label>Company</Label>
        <Input
          placeholder="Acme Inc."
          value={data.company}
          onChange={handleChange('company')}
        />
      </div>

      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="john@example.com"
          value={data.email}
          onChange={handleChange('email')}
        />
      </div>

      <div className="space-y-2">
        <Label>Phone</Label>
        <Input
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={data.phone}
          onChange={handleChange('phone')}
        />
      </div>

      <div className="space-y-2">
        <Label>Website</Label>
        <Input
          type="url"
          placeholder="https://example.com"
          value={data.website}
          onChange={handleChange('website')}
        />
      </div>

      <div className="space-y-2">
        <Label>Photo URL</Label>
        <Input
          type="url"
          placeholder="https://example.com/photo.jpg"
          value={data.photo}
          onChange={handleChange('photo')}
        />
      </div>

      <div className="space-y-2">
        <Label>CTA Text</Label>
        <Input
          placeholder="Book a meeting"
          value={data.ctaText}
          onChange={handleChange('ctaText')}
        />
      </div>

      <div className="space-y-2">
        <Label>CTA Link</Label>
        <Input
          type="url"
          placeholder="https://calendly.com/john"
          value={data.ctaLink}
          onChange={handleChange('ctaLink')}
        />
      </div>

      <div className="space-y-2">
        <Label>Additional CTA Text</Label>
        <Input
          placeholder="View Portfolio"
          value={data.additionalCtaText}
          onChange={handleChange('additionalCtaText')}
        />
      </div>

      <div className="space-y-2">
        <Label>Additional CTA Link</Label>
        <Input
          type="url"
          placeholder="https://portfolio.example.com"
          value={data.additionalCtaLink}
          onChange={handleChange('additionalCtaLink')}
        />
      </div>
    </div>
  );
}
