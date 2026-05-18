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

const schema = z.object({
  title: z.string().min(3),
  message: z.string().min(5),
})

type FormValues = z.infer<typeof schema>

const ComplaintsPage = () => {
  const queryClient = useQueryClient()
  const complaintsQuery = useQuery({ queryKey: ['complaints'], queryFn: () => mockServer.getComplaints() })
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({ resolver: zodResolver(schema) })
  const mutation = useMutation({
    mutationFn: (payload: FormValues) => mockServer.submitComplaint(payload.title, payload.message),
    onSuccess: async () => {
      reset()
      await queryClient.invalidateQueries({ queryKey: ['complaints'] })
    },
  })

  if (complaintsQuery.isLoading) {
    return <LoadingState message="Loading complaints..." />
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card title="Report issue">
        <form className="grid gap-3" onSubmit={(event) => void handleSubmit((values) => mutation.mutate(values))(event)}>
          <Input label="Issue title" {...register('title')} error={errors.title?.message} />
          <label className="grid gap-1 text-sm">
            <span>Issue details</span>
            <textarea className="rounded-lg border border-slate-300 px-3 py-2" rows={4} {...register('message')} />
            {errors.message ? <span className="text-xs text-rose-600">{errors.message.message}</span> : null}
          </label>
          <Button type="submit" disabled={isSubmitting || mutation.isPending}>Submit complaint</Button>
        </form>
      </Card>
      <Card title="Support queue status">
        <DataTable
          columns={[
            { key: 'title', header: 'Title', render: (row) => row.title },
            {
              key: 'status',
              header: 'Status',
              render: (row) => <Badge label={row.status} tone={row.status === 'RESOLVED' ? 'success' : row.status === 'ESCALATED' ? 'danger' : 'warning'} />,
            },
            { key: 'note', header: 'Internal note', render: (row) => row.internalNote ?? '-' },
          ]}
          rows={complaintsQuery.data?.data ?? []}
        />
      </Card>
    </div>
  )
}

export default ComplaintsPage
