import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const [isDisabled, setIsDisabled] = useState(false);

  function toggelDisabled() {
    setIsDisabled(!isDisabled)
  }    

  return (
    <div className="tw-p-2">
      <h3>Welcome Home!</h3>
      <Button onClick={toggelDisabled}>Toggle Disabled</Button>
      <div className='tw-flex tw-flex-col tw-gap-2 tw-p-2'>
        <Button disabled={isDisabled} className='tw-w-fit tw-rounded-md' variant='default'>Primary</Button>
        <Button disabled={isDisabled} className='tw-w-fit' variant='secondary'>Secondary</Button>
        <Button disabled={isDisabled} className='tw-w-fit tw-border tw-border-primary tw-bg-background tw-text-primary hover:tw-bg-accent hover:tw-text-accent-foreground' variant='outline'>Outline</Button>
        <Button disabled={isDisabled} className='tw-w-fit' variant='ghost'>Ghost</Button>
        <Button disabled={isDisabled} className='tw-w-fit' variant='link'>Link</Button>
        <Button disabled={isDisabled} className='tw-w-fit' variant='destructive'>destructive</Button>
      </div>
    </div>
  )
}
