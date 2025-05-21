---
title: Connection Unstable
description: Here are some common issues for fixing connection unstable.
---

# Connection Unstable
If you're experiencing unstable connections, most of the times (90% of the cases) a firewall issue, ufw, iptables or some configuration on your server or between your Coolify instance (or Coolify Cloud) and your server.

## Symptoms
- Server is sometimes reachable, sometimes not.
- You receive a lot of failed connection lost emails.

## Diagnosis
- Check your UFW rules with `ufw status numbered` and see if you have a `LIMIT` rule for port 22.
- Check your iptables rules with `iptables -L -v -n` and see if you have a `LIMIT` rule for port 22.
- Check your server logs (`/var/log/ufw.log`, `/var/log/iptables.log`, `/var/log/auth.log`, `/var/log/kern.log`) for any firewall related errors.

## Solution
- UFW
   - `ufw status numbered` - if you have port 22 open, but with a `LIMIT` rule, this is the problem.
   - `ufw delete <rule_number>` - delete the rule - you probably have IPV4 and IPV6 rules, so you need to delete both.
     - After you deleted the rule, you need to check the status with `ufw status numbered` and see that the rule is deleted and which rule number is next.
   - `ufw allow 22/tcp` - add the rule without a limit.

   OR
   
   - `ufw limit 22/tcp 100/minute` - add a higher limit.

In case of Coolify Cloud, you can enable connection from Coolify Cloud IP addresses by adding the following to the UFW rules:
```sh
 ufw insert 1 allow from <ipv4>/22 to any port 22
 ufw insert 2 allow from <ipv6>/22 to any port 22
```
> You can find the IP addresses in the Coolify Cloud here: https://coolify.io/ipv4.txt and https://coolify.io/ipv6.txt
