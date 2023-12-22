// src/components/secrets-toolbar.ts
import { SettingsView } from "@sanity/studio-secrets"

export const secretsNamespace = "secrets"

const secretConfigs = [
  {
    key: "apiKey",
    title: "Your secret API key",
  },
]

export const SecretInput = ({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) => {
  if (!open) {
    return null
  }

  return (
    <SettingsView
      title={"Secret Settings"}
      namespace={secretsNamespace}
      keys={secretConfigs}
      onClose={onClose}
    />
  )
}