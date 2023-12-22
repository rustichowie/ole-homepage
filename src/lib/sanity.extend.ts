import { useSecrets } from '@sanity/studio-secrets'

const api = process.env.NEXT_PUBLIC_API_ROOT
export function revalidateOnPublish(originalPublishAction) {
  const RevalidateAndPublishAction = (props) => {
    const originalResult = originalPublishAction(props)
    const { secrets } = useSecrets('secrets')
    return {
      ...originalResult,
      onHandle: async () => {
        originalResult.onHandle()
        try {
          const response = await fetch(`${window.location.protocol}//${window.location.host}/api/revalidate`, {
            method: 'POST',
            headers: {
              'api-key': secrets.hasOwnProperty('apiKey')
                ? secrets['apiKey']
                : 'NO',
            },
          })

          if (response.ok) {
            console.log('Everything is OK!')
          }
        } catch (error) {
          console.error(error)
        }
      },
    }
  }
  return RevalidateAndPublishAction
}
