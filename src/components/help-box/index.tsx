import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
  useTheme,
  Button,
  Spacer,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Flex,
} from '@chakra-ui/react';
import { FiInfo, FiX } from 'react-icons/fi';
import Joyride, { CallBackProps, STATUS, Step, ACTIONS, TooltipRenderProps } from 'react-joyride';
import { useSession } from '@roq/nextjs';

interface State {
  run: boolean;
  steps: Step[];
}

function Tooltip(props: TooltipRenderProps) {
  const { backProps, continuous, index, isLastStep, primaryProps, skipProps, step, tooltipProps, closeProps } = props;
  return (
    <Box maxW="md" {...tooltipProps}>
      <Card align="center">
        <CardHeader w="100%">
          <Flex alignItems={'center'} justifyContent="space-between">
            <Heading size="md">{step.title}</Heading>
            <IconButton {...closeProps} icon={<FiX />} />
          </Flex>
        </CardHeader>
        <CardBody>{step.content}</CardBody>
        <CardFooter w="100%">
          <Flex w="100%" justify={'space-between'}>
            <Button
              {...backProps}
              bg={'cyan.500'}
              _hover={{
                bg: 'cyan.700',
              }}
              alignSelf="flex-end"
              colorScheme="blue"
            >
              {index === 0 ? 'EXIT' : 'BACK'}
            </Button>
            <Button
              {...primaryProps}
              bg={'cyan.500'}
              _hover={{
                bg: 'cyan.700',
              }}
              alignSelf="flex-end"
              colorScheme="blue"
            >
              {isLastStep ? 'DONE' : 'NEXT'}
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    </Box>
  );
}

function isFirstLogin() {
  const firstTimeLogin = !localStorage.getItem('userHasLoggedIn');
  if (firstTimeLogin) {
    localStorage.setItem('userHasLoggedIn', 'true');
    return false;
  } else {
    return true;
  }
}

function isFirstVisit() {
  const firstTimeLogin = !localStorage.getItem('userFirstVisit');
  if (firstTimeLogin) {
    localStorage.setItem('userFirstVisit', 'true');
    return false;
  } else {
    return true;
  }
}

export const HelpBox: React.FC = () => {
  const ownerRoles: string[] = ['Business Owner'];
  const customerRoles: string[] = [];
  const tenantRoles: string[] = ['Business Owner'];
  const addOns: string[] = ['notifications', 'chat'];
  const applicationName = `hexamarketing`;
  const tenantName = `Business`;
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;

  const theme = useTheme();
  const { session, status: sessionStatus } = useSession();
  const steps = useMemo<Step[]>(
    () =>
      !Boolean(session?.roqUserId)
        ? [
            {
              title: <Text>{`Hi there! 👋`}</Text>,
              content: (
                <Box>
                  <Text mb="4">
                    {`Welcome to ${applicationName}, your newly generated B2B SaaS application. 
              This in-app briefing will guide you through your application.`}
                  </Text>
                  <Text mb="4">
                    {`If you're satisfied with the results, you can access the complete source code`}
                    {` `}
                    <Link href={githubUrl} isExternal color="teal.500">
                      {`here: GitHub - ${applicationName}`}
                    </Link>
                  </Text>

                  <Text mb="4">
                    Console Dashboard: For configuration and customization options, access our console dashboard. Your
                    project has already been created and is awaiting your input. Check your emails for the invitation.
                  </Text>

                  <Text mb="4">
                    If you have any questions, join our Slack community{` `}
                    <Link href="https://slack.com/roq_community" isExternal color="teal.500">
                      here: Slack - Roq Community
                    </Link>
                  </Text>

                  <Text>
                    Feel free to remove this tutorial by setting the NEXT_PUBLIC_SHOW_BRIEFING environment variable to
                    false.
                  </Text>
                </Box>
              ),
              placement: 'center',
              target: 'body',
            },
            {
              title: <Text>Roles</Text>,
              content: (
                <>
                  <Text mb="4">{`You can use ${applicationName} with one of these roles:`}</Text>
                  <UnorderedList>
                    {ownerRoles.concat(customerRoles).map((role) => (
                      <ListItem key={role}>{role}</ListItem>
                    ))}
                  </UnorderedList>
                </>
              ),
              target: '.roles-container',
            },
            {
              title: <Text>Login to your app</Text>,
              content: (
                <>
                  <Text>
                    {`Currently, you are not logged in. The best way to begin your journey is by signing up as an Owner and creating your first ${tenantName}. Click on "Done" and then select "Register as ${ownerRoles.join(
                      ', ',
                    )}".`}
                  </Text>
                </>
              ),
              target: '.owner-roles-container',
              placement: 'right-end',
            },
          ]
        : [
            {
              disableBeacon: true,
              title: <Text>Invites</Text>,
              placement: 'right-end',
              content: (
                <>
                  <Text>Invite more users to your application. You can invite users with the following roles:</Text>
                  <UnorderedList>
                    {tenantRoles.map((role) => (
                      <ListItem key={role}>{role}</ListItem>
                    ))}
                  </UnorderedList>
                </>
              ),
              target: '.nav-userInvite',
            },
            addOns.includes('chat') && {
              title: <Text>Chat</Text>,
              placement: 'right-end',
              content: (
                <>
                  <Text>You can chat with other users of your application via chat</Text>
                </>
              ),
              target: '.nav-conversation',
            },
            {
              title: <Text>Your App Functionality</Text>,
              placement: 'right-end',
              content: (
                <>
                  <Text>Click through the generated pages to explore the functionality of your application.</Text>
                </>
              ),
              target: '.main-nav',
            },
            {
              title: <Text>User Profile</Text>,
              placement: 'right-end',
              content: (
                <>
                  <Text>Here you can manage your user profile</Text>
                </>
              ),
              target: '.layout-user-profile',
            },
            addOns.includes('notifications') && {
              title: <Text>Notifications</Text>,
              placement: 'right-end',
              content: (
                <>
                  <Text>Here’s your notificaitons feed. Notifications can be configured through console</Text>
                </>
              ),
              target: '.layout-notification-bell',
            },
            {
              title: <Text>Next Steps 🔮</Text>,
              content: (
                <>
                  <Text mb={4}>{`Congratulations! You've reached the end of the product tour.`}</Text>
                  <Text mb={4}>
                    If you are satisfied with the results, you can obtain the entire source code from this{` `}
                    <Link href={githubUrl} isExternal color="teal.500">
                      link
                    </Link>
                  </Text>
                  <Text mb={4}>
                    Console Dashboard: Visit the console dashboard to configure your application, manage emails,
                    notifications, files, and more.
                  </Text>
                  <Text mb={4}>
                    Documentation: Read our comprehensive documentation to deepen your understanding of ROQ.
                  </Text>
                  <Text mb={4}></Text>
                  <Text>
                    If you have any questions, feel free to join our Slack community and connect with fellow users.
                  </Text>
                </>
              ),
              placement: 'center',
              target: 'body',
            },
          ],
    [session?.roqUserId],
  );

  const [run, setRun] = useState(false);
  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type, action, index } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
    }

    // User pressed back on the first step
    if ((status === STATUS.RUNNING || status === STATUS.READY) && action === ACTIONS.PREV && index === 0) {
      setRun(false); // This will close the Joyride
    }
  };

  const handleClickStart = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setRun(true);
  };

  useEffect(() => {
    if (session?.roqUserId) {
      if (!isFirstLogin()) {
        setRun(true);
      }
    } else {
      if (!isFirstVisit()) {
        setRun(true);
      }
    }
  }, [session?.roqUserId]);

  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="30px" bottom="20px" zIndex={3}>
      <IconButton
        onClick={handleClickStart}
        aria-label="Help Info"
        icon={<FiInfo />}
        bg="blue.800"
        color="white"
        _hover={{ bg: 'blue.800' }}
        _active={{ bg: 'blue.800' }}
        _focus={{ bg: 'blue.800' }}
      />
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        hideCloseButton
        run={run}
        scrollToFirstStep
        steps={steps}
        tooltipComponent={Tooltip}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />
    </Box>
  );
};
