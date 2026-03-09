export const formatCurrency = (amount: number, currency = 'TZS'): string =>
  `${currency} ${amount.toLocaleString()}`

export const formatCurrencyShort = (amount: number): string => {
  if (amount >= 1_000_000_000)
    return `TZS ${(amount / 1_000_000_000).toFixed(1)}B`
  if (amount >= 1_000_000)
    return `TZS ${(amount / 1_000_000).toFixed(1)}M`
  if (amount >= 1_000)
    return `TZS ${(amount / 1_000).toFixed(0)}K`
  return `TZS ${amount.toLocaleString()}`
}

export const formatDate = (date: string): string =>
  new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

export const formatDateInput = (date: string): string =>
  new Date(date).toISOString().split('T')[0]

export const getGreeting = (): string => {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export const getInitials = (name: string): string =>
  name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
