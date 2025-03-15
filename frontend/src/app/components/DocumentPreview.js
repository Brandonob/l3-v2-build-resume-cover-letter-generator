import { Box, Heading, Text, VStack, HStack, Button } from '@chakra-ui/react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumePDF from './ResumePDF';

export default function DocumentPreview({ content, title, onDownload, userData }) {
  return (
    <Box className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md'>
      <HStack justify='space-between' mb={4}>
        <Heading size='md' className='text-blue-600'>
          {title}
        </Heading>
        <HStack spacing={4}>
          <Button
            colorScheme='blue'
            onClick={onDownload}
          >
            Download as Text
          </Button>
          
          {/* Only show PDF download for resume */}
          {title === 'Your Resume' && (
            <PDFDownloadLink
              document={<ResumePDF userData={userData} />}
              fileName="resume.pdf"
            >
              {({ blob, url, loading, error }) => (
                <Button
                  colorScheme='green'
                  isLoading={loading}
                  isDisabled={loading || error}
                >
                  Download as PDF
                </Button>
              )}
            </PDFDownloadLink>
          )}
        </HStack>
      </HStack>

      <Box
        className='p-6 border border-gray-200 rounded-md whitespace-pre-wrap'
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Box>
  );
}
