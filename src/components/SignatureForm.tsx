import { SignatureData } from '../types/signature';
import { Input } from './UI/Input';
import { 
  User, 
  Briefcase, 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  Image, 
  MousePointer,
  Link
} from 'lucide-react';

interface SignatureFormProps {
  data: SignatureData;
  onDataChange: (field: keyof SignatureData) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SignatureForm({ data, onDataChange }: SignatureFormProps) {
  return (
    <div className="">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <label htmlFor="fullName">Full Name</label>
            </div>
            <Input
              id="fullName"
              value={data.fullName}
              onChange={onDataChange('fullName')}
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <label htmlFor="jobTitle">Job Title</label>
            </div>
            <Input
              id="jobTitle"
              value={data.jobTitle}
              onChange={onDataChange('jobTitle')}
              placeholder="Software Engineer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <label htmlFor="company">Company</label>
            </div>
            <Input
              id="company"
              value={data.company}
              onChange={onDataChange('company')}
              placeholder="Acme Inc."
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <label htmlFor="email">Email</label>
            </div>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={onDataChange('email')}
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <label htmlFor="phone">Phone</label>
            </div>
            <Input
              id="phone"
              type="tel"
              value={data.phone}
              onChange={onDataChange('phone')}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <label htmlFor="website">Website</label>
            </div>
            <Input
              id="website"
              type="url"
              value={data.website}
              onChange={onDataChange('website')}
              placeholder="https://example.com"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              <label htmlFor="photo">Photo URL</label>
            </div>
            <Input
              id="photo"
              type="url"
              value={data.photo}
              onChange={onDataChange('photo')}
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MousePointer className="h-4 w-4" />
              <label htmlFor="ctaText">CTA Text</label>
            </div>
            <Input
              id="ctaText"
              value={data.ctaText}
              onChange={onDataChange('ctaText')}
              placeholder="Schedule a Meeting"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              <label htmlFor="ctaLink">CTA Link</label>
            </div>
            <Input
              id="ctaLink"
              type="url"
              value={data.ctaLink}
              onChange={onDataChange('ctaLink')}
              placeholder="https://calendly.com/johndoe"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MousePointer className="h-4 w-4" />
              <label htmlFor="additionalCtaText">Additional CTA Text</label>
            </div>
            <Input
              id="additionalCtaText"
              value={data.additionalCtaText}
              onChange={onDataChange('additionalCtaText')}
              placeholder="Visit Our Website"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              <label htmlFor="additionalCtaLink">Additional CTA Link</label>
            </div>
            <Input
              id="additionalCtaLink"
              type="url"
              value={data.additionalCtaLink}
              onChange={onDataChange('additionalCtaLink')}
              placeholder="https://example.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
