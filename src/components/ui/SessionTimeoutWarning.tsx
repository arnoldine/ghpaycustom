import { useAuth } from '../../auth/AuthProvider'
import { Modal } from './Modal'

export const SessionTimeoutWarning = () => {
  const { warningVisible, warningCountdown, tickActivity, logout } = useAuth()
  return (
    <Modal
      open={warningVisible}
      title="Session Timeout Warning"
      onClose={tickActivity}
      onConfirm={() => {
        void logout()
      }}
      confirmLabel="Logout"
    >
      <p>Your session will expire in {warningCountdown}s due to inactivity.</p>
    </Modal>
  )
}
