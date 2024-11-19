import {} from 'react'
import { Snackbar } from '@mui/material'
import { useAtomValue } from 'jotai'
import * as toastActions from '../stores/toastActions'
import * as atoms from '../stores/atoms'

function Toasts() {
    const toasts = useAtomValue(atoms.toastsAtom)
    return (
        <>
            {toasts.map((toast) => (
                <Snackbar
                    className="Snackbar"
                    key={toast.id}
                    open
                    onClose={() => toastActions.remove(toast.id)}
                    message={toast.content}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                />
            ))}
        </>
    )
}

export default Toasts
