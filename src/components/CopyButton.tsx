import React, { useState } from 'react';
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  useClipboard,
  useDisclosure,
  Box,
} from '@chakra-ui/react';
import { PiCopySimpleLight } from 'react-icons/pi';

const CopyButton: React.FC<{ address: string }> = ({ address }) => {
  const { hasCopied, onCopy } = useClipboard(address);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const handleCopy = () => {
    onCopy();
    if (!isOpen) {
      onOpen();
    }
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(setTimeout(onClose, 1000)); // Close popover after 1 second
  };

  return (
    <Popover isOpen={isOpen} onClose={onClose} autoFocus={false}>
      <PopoverTrigger>
        <Button variant="nav" p={0} pb={'2px'} onClick={handleCopy}>
          <PiCopySimpleLight />
        </Button>
      </PopoverTrigger>
      <PopoverContent w="auto" maxW="unset" p={0} boxShadow="md">
        <PopoverArrow />
        <PopoverBody p={2}>
          <Box>Copied!</Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default CopyButton;
