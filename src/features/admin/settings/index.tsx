import { useState } from 'react'
import { branding as initialBranding } from '../../../config/branding'
import Card from '../../../components/ui/Card'
import Input from '../../../components/ui/Input'

const SettingsPage = () => {
  const [branding, setBranding] = useState(initialBranding)

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card title="Branding / White-label settings">
        <div className="grid gap-3">
          <Input label="Institution Name" value={branding.institutionName} onChange={(event) => setBranding((prev) => ({ ...prev, institutionName: event.target.value }))} />
          <Input label="Primary Color" value={branding.primaryColor} onChange={(event) => setBranding((prev) => ({ ...prev, primaryColor: event.target.value }))} />
          <Input label="Secondary Color" value={branding.secondaryColor} onChange={(event) => setBranding((prev) => ({ ...prev, secondaryColor: event.target.value }))} />
          <Input label="Logo URL" value={branding.logoUrl} onChange={(event) => setBranding((prev) => ({ ...prev, logoUrl: event.target.value }))} />
          <Input label="Support Phone" value={branding.supportPhone} onChange={(event) => setBranding((prev) => ({ ...prev, supportPhone: event.target.value }))} />
          <Input label="Support Email" value={branding.supportEmail} onChange={(event) => setBranding((prev) => ({ ...prev, supportEmail: event.target.value }))} />
        </div>
      </Card>
      <Card title="Live preview">
        <div className="rounded-xl border p-4" style={{ borderColor: branding.primaryColor }}>
          <img src={branding.logoUrl} alt={branding.institutionName} className="mb-3 h-12 w-auto" />
          <h3 className="text-lg font-semibold" style={{ color: branding.primaryColor }}>{branding.institutionName}</h3>
          <p className="text-sm" style={{ color: branding.secondaryColor }}>Support: {branding.supportPhone} • {branding.supportEmail}</p>
          <p className="mt-2 text-xs text-slate-500">Preview only. Persisting branding can be integrated with backend config APIs later.</p>
        </div>
      </Card>
    </div>
  )
}

export default SettingsPage
