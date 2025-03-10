import { Box, Heading, Text, VStack, HStack, Button } from '@chakra-ui/react';
// import { DownloadIcon } from '@chakra-ui/icons';

export default function DocumentPreview({ content, title, onDownload }) {
  return (
    <Box className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md'>
      <HStack justify='space-between' mb={4}>
        <Heading size='md' className='text-blue-600'>
          {title}
        </Heading>
        <Button
          // leftIcon={<DownloadIcon />}
          colorScheme='blue'
          onClick={onDownload}
        >
          Download
        </Button>
      </HStack>

      <Box
        className='p-6 border border-gray-200 rounded-md whitespace-pre-wrap'
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Box>
  );
}
