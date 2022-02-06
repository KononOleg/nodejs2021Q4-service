<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Performance comparison
## Express
|                                      |                 |
|--------------------------------------|-----------------|
| http.codes.200                       |     1540        |
| http.codes.201                       |     385         |
| http.request_rate                    |     118/sec     |
| http.requests                        |     1925        |
| http.response_time                   |                 |
| min                                  |     1           |
| max                                  |     578         |
| median                               |     10.9        |
| p95                                  |     391.6       |
| p99                                  |     507.8       |
| http.responses                       |     1925        |
| vusers.completed                     |     385         |
| vusers.created                       |     385         |
| vusers.created_by_name.test /users   |     385         |
| vusers.session_length                |                 |
| min                                  |     36.7        |
| max                                  |     1728.6      |
| median                               |     68.7        |
| p95                                  |     1620        |
| p99                                  |     1686.1      |

## Fastify
|                                      |                 |
|--------------------------------------|-----------------|
| http.codes.200                       |     1464        |
| http.codes.201                       |     366         |
| http.request_rate                    |     134/sec     |
| http.requests                        |     1830        |
| http.response_time                   |                 |
| min                                  |     1           |
| max                                  |     421         |
| median                               |     10.9        |
| p95                                  |     77.5        |
| p99                                  |     156         |
| http.responses                       |     1830        |
| vusers.completed                     |     366         |
| vusers.created                       |     366         |
| vusers.created_by_name.test /users   |     366         |
| vusers.session_length                |                 |
| min                                  |     37.7        |
| max                                  |     749         |
| median                               |     76          |
| p95                                  |     320.        |
| p99                                  |     561.2       |


