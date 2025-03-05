import { Dialog, DialogPanel, Button} from '@headlessui/react'

 type WinPanelProps ={
      openWinPanel:boolean,
      setOpenWinPanel:any,
      setReset:any
  };

export default function WinPanel(props:WinPanelProps) {
  
  const close = () =>{
   props.setOpenWinPanel(false);
   props.setReset(true);
  }

  return (
    <Dialog open={props.openWinPanel} as="div" className="relative z-10 focus:outline-none" onClose={close}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <DialogPanel
                  transition
                  className="w-full max-w-md h-full min-h-screen flex flex-col justify-center items-center rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                >
                    <div className='flex flex-col items-center pb-12'>
                  <img src="./src/image/images.png" className='w-42 pb-4'/>
                  <h1 className='text-xl text-black font-bold'>YOU WIN</h1>
                  </div>
                 
                  <div className="mt-4">
                    <Button onClick={close}
                      className=" inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-black data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-black"
                      
                   >
                      Play Again
                    </Button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
  )
}
