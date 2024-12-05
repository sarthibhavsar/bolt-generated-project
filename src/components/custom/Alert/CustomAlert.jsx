import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2, CircleHelp, XCircle } from 'lucide-react'



export function CustomAlert({ variant, title, message, isOpen, onConfirm, onCancel, onOpenChange }) {
  const getIcon = () => {
    switch (variant) {
      case 'success':
        return <CheckCircle2 className="w-16 h-16 text-green-500" />
      case 'error':
        return <XCircle className="w-16 h-16 text-red-500" />
      case 'delete':
        return <AlertCircle className="w-16 h-16 text-yellow-500" />
      case 'confirm':
        return <CircleHelp className="w-16 h-16 text-yellow-500" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange} >
      <DialogContent className="sm:max-w-[425px]" onPointerDownOutside={() => {}}>
        <DialogHeader>
          <DialogTitle className="mb-2 text-center">{title}</DialogTitle>
          <div className="flex items-center justify-center mb-4">
            {getIcon()}
          </div>
        </DialogHeader>
        <div className="text-center ">
          {message}
        </div>
        <DialogFooter className="sm:justify-center">
          {(variant === 'delete' || variant === 'confirm') && (
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button 
            onClick={onConfirm}
            variant={variant === 'delete' || variant === 'confirm' ? "destructive" : "default"}
          >
            {variant === 'delete' ? 'Delete' : 'OK'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
