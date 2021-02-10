# DeCameo
Decentralized cameos for charty. Blockchain profiles such as Vitalik can create a profile. People can then order personalized videos, and once delivered (IPFS), the ether goes to charity.

## The problem DeCameo solves
A person like myself can connect with famous blockchain profiles (or celebrities in general), get answers to programming questions or just receive a nice happy birthday wish etc. The celebrities will be incentivised to use the product as money goes to charity, they can get some exposure and goodwill, as well as connecting to their followers.

People ordering the videos will do so knowing their funds will go to the charity organization (a verified ethereum address) chosen by the registered profile. Also a good way to send a happy birthday wish or a motivation talk to a friend.

In the charity space, it's often only about giving, which people with money do if they also have the motivation to do so. DeCameo is a fun product that should motivate people to give more to charity and help people in need. With crypto currency values surging, many in the blockchain space have funds but miss that little extra motivation to do something good with the money. DeCameo makes it easy to choose a charity organization to give to, and it offers a playful product where both registered profiles and people ordering videos get a clear value back. It can be a way for celebrities and fans to donate funds together while having fun.

## Challenges I ran into

### Gas cost
As always with smart contracts, it can sometimes get too expensive and not be worthwhile sending a transaction. We have stored the profile data and order data (including ipfs hash of video) on in a smart contract, and we need to fetch this data to the frontend efficiently. We're still not finished, but this is something that feels a bit challenging in advance (we haven't tried it out yet).

### Login and privacy
For the purpose of the Buidlathon and the time at our disposal, we've decided to not have a login (would otherwise do it with signing a transaction and JWT). This means everyone will be able to see all the profile and order information frontend, which can be perceived as a bit odd. This is, however, possible because only the address that created a profile (i.e. msg.sender) can update profile data, send videos etc.

### Notifications
In the same spirit as above, we didn't find a good decentralized way to notify registered profiles and this is yet to be solved. We always felt that a decentralized product as DeCameo shouldn't ask for email addresses from people that we need to store on a public blockchain - which would be used for email notification (e.g. nodemailer).
There are two solutions to this dilemma, which are 1) ask for Twitter handle instead and build a twitter bot to notify people. This would work better as the Twitter handle is public and not as sentisitve as an email address. The second option, 2), would be to create a SQL table to store the email addresses, but that would feel like compromising too much with decentralization and that DeCameo wants to offer a solution 100% in that spirit.

Solutions are to be continued...


## Technologies I used
- React
- IPFS
- Ethereum
- SASS
- Truffle
