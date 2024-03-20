'use client';

import Image from 'next/image'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function Points({ point }: any) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className='flex align-middle justify-center'>
            <Image width={25} height={25} src="/icons/points.png" alt="" />
            <p className='px-2'>{point} </p>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>This is points.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}   
