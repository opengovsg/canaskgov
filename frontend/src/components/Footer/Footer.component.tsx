import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa'
import { Link as RouterLink } from 'react-router-dom'
import {
  Container,
  Divider,
  HStack,
  Image,
  Link,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { format } from 'date-fns-tz'

import OGPLogo from '../../assets/ogp-logo.svg'
import { useAuth } from '../../contexts/AuthContext'
import { OGP } from '../Icons'
import { usePathGenerator } from '../../util'
import { routes } from '../../constants'
// Credits: CheckFirst

const Footer = (): JSX.Element => {
  const pathGen = usePathGenerator()
  return (
    <Container
      maxW="1504px"
      m="auto"
      w="100vw"
      px={{ base: 8, md: 12 }}
      color="secondary.800"
    >
      <Stack
        pt={{ base: '56px', md: '48px' }}
        pb="40px"
        direction={{ base: 'column', md: 'row' }}
        justifyContent={{ md: 'space-between' }}
        alignItems={{ md: 'flex-end' }}
        spacing="24px"
        textStyle="body-2"
      >
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: '4px', md: '16px' }}
        >
          <Text textStyle="h4">AskGov</Text>
          <Text>Answers from the Singapore Government</Text>
        </Stack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: '16px', md: '22px' }}
        >
          <RouterLink to={pathGen.get(routes.privacyStatement)}>
            <Text
              _hover={{
                color: 'primary.500',
              }}
            >
              Privacy
            </Text>
          </RouterLink>
          <RouterLink to={pathGen.get(routes.termsOfUse)}>
            <Text
              _hover={{
                color: 'primary.500',
              }}
            >
              Terms of Use
            </Text>
          </RouterLink>
          <Link href="https://www.tech.gov.sg/report_vulnerability" isExternal>
            <Text
              _hover={{
                color: 'primary.500',
              }}
            >
              Report Vulnerability
            </Text>
          </Link>
        </Stack>
      </Stack>
      <Divider />
      <Stack
        py="48px"
        direction={{ base: 'column', md: 'row' }}
        justifyContent={{ md: 'space-between' }}
        alignItems={{ md: 'flex-end' }}
        spacing={{ base: '32px', md: '0px' }}
      >
        <VStack
          justifyContent="flex-start"
          alignItems={{ base: 'flex-start', md: 'center' }}
        >
          <Text textStyle="caption-1" width="100%">
            Built by
          </Text>
          <Link href="https://open.gov.sg" isExternal>
            <Image
              htmlWidth="160px"
              htmlHeight="47px"
              src={OGPLogo}
              alt="Open Government Products Logo"
              loading="lazy"
            />
          </Link>
        </VStack>

        <VStack align="stretch">
          <HStack color="black" justifyContent={{ md: 'flex-end' }}>
            <Link
              href="https://www.linkedin.com/company/open-government-products/"
              isExternal
              _hover={{
                color: 'primary.500',
              }}
            >
              <FaLinkedinIn size="28" style={{ marginRight: '5px' }} />
            </Link>
            <Link
              href="https://www.facebook.com/opengovsg"
              isExternal
              _hover={{
                color: 'primary.500',
              }}
            >
              <FaFacebookF size="24" style={{ marginRight: '5px' }} />
            </Link>
            <Link
              href="https://open.gov.sg"
              isExternal
              _hover={{
                color: 'primary.500',
              }}
            >
              <OGP />
            </Link>
          </HStack>
          <Link href="https://open.gov.sg" isExternal>
            <Text
              textStyle="caption-2"
              _hover={{
                color: 'primary.500',
              }}
            >
              © {format(Date.now(), 'yyyy')} Open Government Products,
              Government Technology Agency of Singapore
            </Text>
          </Link>
        </VStack>
      </Stack>
    </Container>
  )
}

export default Footer
