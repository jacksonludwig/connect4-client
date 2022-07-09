import { Flex, Spinner } from '@chakra-ui/react';
import { ReactElement } from 'react';

type Props = {
  enabled: boolean;
};

const LoadingOverlay = ({ enabled }: Props): ReactElement => {
  return (
    <>
      {enabled && (
        <Flex
          align="center"
          justify="center"
          position="absolute"
          h="100%"
          w="100%"
          bg="rgba(0, 0, 0, 0.5)"
        >
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Flex>
      )}
    </>
  );
};

export default LoadingOverlay;
