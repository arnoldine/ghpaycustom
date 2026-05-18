import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { mockServer } from '../../../api/mockServer'
import Badge from '../../../components/ui/Badge'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import DataTable from '../../../components/ui/DataTable'
import Input from '../../../components/ui/Input'
import LoadingState from '../../../components/ui/LoadingState'

const schema = z.object({ deviceName: z.string().min(3) })

type FormValues = z.infer<typeof schema>

const DevicesPage = () => {
  const queryClient = useQueryClient()
  const devicesQuery = useQuery({ queryKey: ['customer-devices'], queryFn: () => mockServer.getDevices() })
  const registerMutation = useMutation({
    mutationFn: (deviceName: string) => mockServer.registerDevice(deviceName),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['customer-devices'] })
    },
  })
  const unlinkMutation = useMutation({
    mutationFn: (deviceId: string) => mockServer.unlinkDevice(deviceId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['customer-devices'] })
    },
  })

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({ resolver: zodResolver(schema) })

  if (devicesQuery.isLoading) {
    return <LoadingState message="Loading devices..." />
  }

  const devices = devicesQuery.data?.data ?? []
  const currentLinked = devices.some((device) => device.current && device.linked)

  return (
    <div className="grid gap-4">
      {!currentLinked ? (
        <Card>
          <p className="text-sm text-rose-700">Warning: current device is not linked. Link a trusted device to continue secure transactions.</p>
        </Card>
      ) : null}
      <Card title="Register Device">
        <p className="mb-3 text-xs text-slate-500">Consent: You authorize this device to access your wallet account.</p>
        <form
          className="flex flex-col gap-3 sm:flex-row"
          onSubmit={(event) =>
            void handleSubmit(async (values) => {
              await registerMutation.mutateAsync(values.deviceName)
              reset()
            })(event)
          }
        >
          <Input label="Device name" {...register('deviceName')} error={errors.deviceName?.message} />
          <Button className="self-end" type="submit">Register</Button>
        </form>
      </Card>
      <Card title="Linked devices">
        <DataTable
          columns={[
            { key: 'deviceId', header: 'Device ID', render: (row) => row.deviceId },
            { key: 'name', header: 'Device', render: (row) => row.deviceName },
            { key: 'last', header: 'Last login', render: (row) => new Date(row.lastLogin).toLocaleString('en-GH') },
            {
              key: 'status',
              header: 'Linked status',
              render: (row) => <Badge label={row.linked ? 'Linked' : 'Unlinked'} tone={row.linked ? 'success' : 'warning'} />,
            },
            {
              key: 'action',
              header: 'Action',
              render: (row) => (
                <Button variant="secondary" onClick={() => unlinkMutation.mutate(row.deviceId)}>
                  Unlink request
                </Button>
              ),
            },
          ]}
          rows={devices}
        />
      </Card>
    </div>
  )
}

export default DevicesPage
