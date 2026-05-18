import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { walletApi } from '../../../api/walletApi'
import { Badge } from '../../../components/ui/Badge'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'

export const DevicesPage = () => {
  const queryClient = useQueryClient()
  const devices = useQuery({ queryKey: ['device-list'], queryFn: walletApi.getDevices })
  const registerMutation = useMutation({
    mutationFn: walletApi.registerDevice,
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['device-list'] }),
  })
  const unlinkMutation = useMutation({
    mutationFn: walletApi.unlinkDevice,
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['device-list'] }),
  })

  const linked = (devices.data?.data ?? []).some((d) => d.linked)

  return (
    <Card className="space-y-3">
      <h1 className="text-xl font-semibold">Device Management</h1>
      {!linked && <p className="rounded bg-amber-100 p-2 text-sm text-amber-800">Warning: No linked device found.</p>}
      <p className="text-xs text-slate-500">Device linking consent enables account protection and fraud controls.</p>
      <Button onClick={() => void registerMutation.mutateAsync()}>Register Device</Button>
      <div className="space-y-2 text-sm">
        {(devices.data?.data ?? []).map((device) => (
          <div key={device.id} className="rounded border p-2">
            <p className="font-medium">{device.name} {device.current ? '(Current)' : ''}</p>
            <p>ID: {device.id}</p>
            <p>Last Login: {new Date(device.lastLogin).toLocaleString()}</p>
            <div className="mt-1 flex items-center justify-between">
              <Badge text={device.linked ? 'LINKED' : 'UNLINKED'} tone={device.linked ? 'green' : 'amber'} />
              {device.linked && <Button className="bg-slate-600" onClick={() => void unlinkMutation.mutateAsync(device.id)}>Unlink</Button>}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
