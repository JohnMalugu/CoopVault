import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { 
  User, 
  Users, 
  Heart, 
  Landmark, 
  Phone, 
  Briefcase, 
  Lock,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Save
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Stepper } from '@/components/ui/Stepper'
import { Input, Select } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

// Define the steps with their corresponding icons
const steps = [
  { label: 'Biodata', icon: User },
  { label: 'Next of Kin', icon: Users },
  { label: 'Spouse', icon: Heart },
  { label: 'Bank Details', icon: Landmark },
  { label: 'Contacts', icon: Phone },
  { label: 'Income', icon: Briefcase },
  { label: 'Credentials', icon: Lock },
]

const FormGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">{children}</div>
)

const SectionCard: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode }> = ({ title, icon: Icon, children }) => (
  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm mb-6">
    <div className="flex items-center gap-3 px-8 py-5 border-b border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/20">
      <div className="p-2 bg-primary-50 dark:bg-primary-900/30 rounded-lg text-primary-600 dark:text-primary-400">
        <Icon size={20} strokeWidth={2.5} />
      </div>
      <span className="font-bold text-gray-900 dark:text-white tracking-tight">{title}</span>
    </div>
    <div className="p-8">{children}</div>
  </div>
)

export const ProfilePage: React.FC = () => {
  const [step, setStep] = useState(0)

  const next = () => { 
    setStep(s => Math.min(s + 1, 6))
    toast.success(`${steps[step].label} saved`) 
  }
  const prev = () => setStep(s => Math.max(s - 1, 0))

  const Nav: React.FC = () => (
    <div className="flex justify-end items-center gap-4 mt-10 pt-6 border-t border-gray-100 dark:border-gray-800">
      {step > 0 && (
        <Button variant="secondary" onClick={prev} className="gap-2 group">
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
          Back
        </Button>
      )}
      
      {step < 6 ? (
        <Button onClick={next} className="gap-2 group">
          Next: {steps[step + 1]?.label} 
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Button>
      ) : (
        <Button onClick={() => toast.success('Profile updated!')} className="gap-2 bg-emerald-600 hover:bg-emerald-700">
          <Save size={18} /> Save All Changes
        </Button>
      )}
    </div>
  )

  return (
    <div className="animate-fade-in max-w-5xl mx-auto space-y-6">
      <PageHeader 
        title="My Profile" 
        subtitle="Ensure your personal information is up to date" 
      />
      
      <div className="mb-8">
        <Stepper steps={steps} current={step} onStepClick={setStep} />
      </div>

      {step === 0 && (
        <SectionCard title="Personal Information" icon={User}>
          <FormGrid>
            <Input label="First Name" defaultValue="John" />
            <Input label="Middle Name" defaultValue="Peter" />
            <Input label="Last Name" defaultValue="Mwangi" />
            <Input label="Member ID" defaultValue="MEM-00234" readOnly className="bg-gray-50 dark:bg-gray-800/50" />
            <Input label="Date of Birth" type="date" defaultValue="1985-03-15" />
            <Select label="Gender" options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} defaultValue="male" />
            <Input label="National ID" defaultValue="19850315-12345-00234-6" />
            <Select label="Marital Status" options={[{value:'married',label:'Married'},{value:'single',label:'Single'}]} defaultValue="married" />
          </FormGrid>
          <Nav />
        </SectionCard>
      )}

      {step === 1 && (
        <SectionCard title="Next of Kin" icon={Users}>
          <FormGrid>
            <Input label="Full Name" defaultValue="Mary Mwangi" />
            <Select label="Relationship" options={[{value:'spouse',label:'Spouse'},{value:'child',label:'Child'}]} defaultValue="spouse" />
            <Input label="Phone Number" defaultValue="+255 712 345 678" />
            <Input label="National ID" defaultValue="19880520-56789-00890-3" />
            <div className="sm:col-span-2">
               <Input label="Address" defaultValue="Dar es Salaam, Tanzania" />
            </div>
          </FormGrid>
          <Nav />
        </SectionCard>
      )}

      {/* Steps 2-5 follow the same pattern... */}

      {step === 3 && (
        <SectionCard title="Bank Details" icon={Landmark}>
          <FormGrid>
            <Select label="Bank Name" options={[{value:'crdb',label:'CRDB Bank'}]} defaultValue="crdb" />
            <Input label="Account Number" defaultValue="01234567890" />
            <Input label="Account Name" defaultValue="JOHN PETER MWANGI" readOnly />
            <Input label="Swift Code" defaultValue="CRDBTZTZ" />
          </FormGrid>
          <Nav />
        </SectionCard>
      )}

      {step === 6 && (
        <SectionCard title="Security & Credentials" icon={Lock}>
          <div className="max-w-md space-y-4">
            <Input label="Username" defaultValue="MEM-00234" readOnly />
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 rounded-xl flex gap-3 mb-6">
                <CheckCircle2 className="text-amber-600 shrink-0" size={18} />
                <p className="text-[11px] text-amber-800 dark:text-amber-400 font-medium">
                    Changing your password will require a new login session. Please ensure you have your secondary MFA device ready.
                </p>
            </div>
            <Input label="Current Password" type="password" />
            <Input label="New Password" type="password" />
            <Input label="Confirm New Password" type="password" />
          </div>
          <Nav />
        </SectionCard>
      )}
    </div>
  )
}