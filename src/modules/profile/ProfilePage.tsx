import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { PageHeader } from '@/components/ui/PageHeader'
import { Stepper } from '@/components/ui/Stepper'
import { Input, Select, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

const steps = [
  { label: 'Biodata' }, { label: 'Next of Kin' }, { label: 'Spouse' },
  { label: 'Bank Details' }, { label: 'Contacts' }, { label: 'Income' },
  { label: 'Credentials' },
]

const FormGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
)

const SectionCard: React.FC<{ title: string; icon: string; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-card mb-5">
    <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
      <span className="text-lg">{icon}</span>
      <span className="font-bold text-gray-900 dark:text-white">{title}</span>
    </div>
    <div className="p-6">{children}</div>
  </div>
)

export const ProfilePage: React.FC = () => {
  const [step, setStep] = useState(0)

  const next = () => { setStep(s => Math.min(s + 1, 6)); toast.success('Section saved') }
  const prev = () => setStep(s => Math.max(s - 1, 0))

  const Nav: React.FC = () => (
    <div className="flex justify-end gap-3 mt-4">
      {step > 0 && <Button variant="secondary" onClick={prev}>← Back</Button>}
      {step < 6
        ? <Button onClick={next}>Next → {steps[step + 1]?.label}</Button>
        : <Button onClick={() => toast.success('Profile saved successfully! 🎉')}>✓ Save All Changes</Button>
      }
    </div>
  )

  return (
    <div className="animate-fade-in">
      <PageHeader title="My Profile" subtitle="Manage your personal information" />
      <Stepper steps={steps} current={step} onStepClick={setStep} />

      {step === 0 && (
        <SectionCard title="Personal Information" icon="👤">
          <FormGrid>
            <Input label="First Name" defaultValue="John" />
            <Input label="Middle Name" defaultValue="Peter" />
            <Input label="Last Name" defaultValue="Mwangi" />
            <Input label="Member ID" defaultValue="MEM-00234" readOnly className="opacity-60 cursor-not-allowed" />
            <Input label="Date of Birth" type="date" defaultValue="1985-03-15" />
            <Select label="Gender" options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} defaultValue="male" />
            <Input label="National ID" defaultValue="19850315-12345-00234-6" />
            <Select label="Marital Status" options={[{value:'married',label:'Married'},{value:'single',label:'Single'},{value:'divorced',label:'Divorced'}]} defaultValue="married" />
            <Input label="Nationality" defaultValue="Tanzanian" />
            <Input label="Religion" defaultValue="Christian" />
          </FormGrid>
          <Nav />
        </SectionCard>
      )}

      {step === 1 && (
        <SectionCard title="Next of Kin" icon="👨‍👩‍👧">
          <FormGrid>
            <Input label="Full Name" defaultValue="Mary Mwangi" />
            <Select label="Relationship" options={[{value:'spouse',label:'Spouse'},{value:'child',label:'Child'},{value:'parent',label:'Parent'},{value:'sibling',label:'Sibling'}]} defaultValue="spouse" />
            <Input label="Phone Number" defaultValue="+255 712 345 678" />
            <Input label="National ID" defaultValue="19880520-56789-00890-3" />
            <Input label="Address" defaultValue="Dar es Salaam, Tanzania" className="col-span-full" />
            <Input label="Share Percentage (%)" type="number" defaultValue={100} />
          </FormGrid>
          <Nav />
        </SectionCard>
      )}

      {step === 2 && (
        <SectionCard title="Spouse Details" icon="💍">
          <FormGrid>
            <Input label="Spouse Name" defaultValue="Mary Mwangi" />
            <Input label="Date of Birth" type="date" defaultValue="1988-05-20" />
            <Input label="Employment" defaultValue="Teacher" />
            <Input label="Employer" defaultValue="Ministry of Education" />
            <Input label="Phone" defaultValue="+255 712 345 678" />
            <Input label="National ID" defaultValue="19880520-56789-00890-3" />
          </FormGrid>
          <Nav />
        </SectionCard>
      )}

      {step === 3 && (
        <SectionCard title="Bank Details" icon="🏦">
          <FormGrid>
            <Select label="Bank Name" options={[{value:'crdb',label:'CRDB Bank'},{value:'nmb',label:'NMB Bank'},{value:'stanbic',label:'Stanbic Bank'},{value:'nbc',label:'NBC'}]} defaultValue="crdb" />
            <Input label="Account Number" defaultValue="01234567890" />
            <Input label="Account Name" defaultValue="JOHN PETER MWANGI" />
            <Input label="Branch" defaultValue="Dar es Salaam Main" />
            <Input label="Swift Code" defaultValue="CRDBTZTZ" />
          </FormGrid>
          <Nav />
        </SectionCard>
      )}

      {step === 4 && (
        <SectionCard title="Contact Information" icon="📞">
          <FormGrid>
            <Input label="Primary Phone" defaultValue="+255 744 123 456" />
            <Input label="Secondary Phone" defaultValue="+255 712 987 654" />
            <Input label="Email Address" type="email" defaultValue="john.mwangi@email.com" />
            <Input label="Postal Address" defaultValue="P.O. Box 1234, Dar es Salaam" />
            <Input label="Physical Address" defaultValue="Kinondoni, Dar es Salaam" />
            <Input label="Region" defaultValue="Dar es Salaam" />
          </FormGrid>
          <Nav />
        </SectionCard>
      )}

      {step === 5 && (
        <SectionCard title="Income Information" icon="💼">
          <FormGrid>
            <Select label="Employment Type" options={[{value:'public',label:'Public Servant'},{value:'private',label:'Private Sector'},{value:'self',label:'Self-Employed'},{value:'biz',label:'Business Owner'}]} defaultValue="public" />
            <Input label="Employer" defaultValue="Tanzania Revenue Authority" />
            <Input label="Department" defaultValue="Operations" />
            <Input label="Job Title" defaultValue="Senior Officer" />
            <Input label="Gross Monthly Salary (TZS)" type="number" defaultValue={1500000} />
            <Input label="Net Monthly Salary (TZS)" type="number" defaultValue={1100000} />
            <Input label="Other Income Source" defaultValue="Rental Income" />
            <Input label="Other Income (TZS/month)" type="number" defaultValue={300000} />
          </FormGrid>
          <Nav />
        </SectionCard>
      )}

      {step === 6 && (
        <SectionCard title="Login Credentials" icon="🔐">
          <FormGrid>
            <Input label="Username" defaultValue="MEM-00234" readOnly className="opacity-60 cursor-not-allowed" />
            <div /> {/* spacer */}
            <Input label="Current Password" type="password" placeholder="Enter current password" />
            <div />
            <Input label="New Password" type="password" placeholder="At least 8 characters" />
            <Input label="Confirm New Password" type="password" placeholder="Repeat new password" />
          </FormGrid>
          <Nav />
        </SectionCard>
      )}
    </div>
  )
}
