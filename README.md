# Kinship

## Overview

Kinship: Quest for Blood (Blood Like Family, Not Killing) is a role-playing game with the goal of capturing a castle, aided by the others you have defeated on your journey.

## The Technical Stuff

Kinship is built in React/Redux with a Ruby on Rails Backend

Authorization built around JWT tokens

## Playing the Game

#### Sign Up

As a first time player, click sign up. Create a unique username.

From there you are taken to the character creation screen.

#### Character Creation

Here you will create your party leader. You have a choice of four classes – Knight, Cleric, Rogue, and Mage.
Each has a unique spell and varying amounts of health that will affect their battling.
* The Knight has 20 health, and can spend 3 mana to cast 'Whirlwind', which does 1 damage to every enemy
* The Cleric has 15 health, and can spend 1 mana to cast 'Minor Heal' to heal any ally for 1 health point
* The Rogue has 12 health, and can spend 4 mana to cast 'Smoke Bomb' which allows them to take an extra turn
* The Mage has 10 health, and can spend all of their mana to cast 'Fireball', which does the square of the mana spent in damage to 1 target

There are also different armor colors as well as accent colors, which can affect skin tone, or in the case of the Knight, plume color.

Choose a cool name, then click 'Create Character'

#### The Party Screen

The party screen has 4 sections 

1. The Party Itself (top left)

At first this will just be your character, but in time that will grow. This is just a list of everyone who will join you in battle.

2. Inventory (bottom left)

This is all of the equipment you have purchased at the store. You can click anything here and then click a party member to equip them. Any equipped party members will receive bonuses during combat.

3. Map List (top right)

This is a list of all maps that have been created. It starts off empty.

4. Create a Map (bottom right)

To create a map all you need is to name it and pick a size – they range from 4x4 to 7x7. These don't reflect difficulty – 4x4 can be a lot tougher because the harder squares are closer!



There are also some links at the top– from right to left–

1. Logout

This logs out of your account.

2. Edit Name

If you don't want your party to be referred to by your username you can change it to whatever you like!

3. Store

This link takes you to the store.


#### The Store

The store has several items on display. If you have enough gold you can buy an item by clicking it. Any items you buy will be available to equip to a party member.

Most just add health, damage or mana during battle, but the tabard unlocks the 'Recruit' function – we'll get into that later!

#### The Battlefield

Once a map is created and clicked on, you are taken to the battlefield.

Our goal is to reach the castle in the fewest number of moves.

We use the arrow keys to move, and every time we enter a new square we have an encounter.

An encounter features a primary enemy, called out by class name, and some number of allies. The number of enemies in each square increases as you travel away from the origin square.

We have 2-3 options when an encounter starts: 
1. Bribing
  
  Bribing will instantly resolve the encounter, but will cost gold based on how many enemies are present. A resolved encounter means the square becomes safe (you won't experience more encounters by entering) and the primary enemy joins your team.
  
2. Battling

  Battling means you will enter a battle! 
  
3. Recruiting

  Recruiting works like bribing, but it costs no money! However, there is a chance that the enemies won't be swayed and you will be forced to battle.

#### Battling

To get started, click 'Start Battle'.

The highlighted character takes a turn – first someone from your team, then alternating back and forth.

A turn works by rolling 6 dice, with 3 possible faces –

1. The Heart – Gain 1 Life if you have been damaged
2. The Bolt – Gain 1 Mana to use for spells later in the turn
3. The Sword – Gain 1 damage to deal to enemies later in the turn

Once you have rolled 3 times you get the final result of the rolls. The faces don't need to match, each is it's own individual result.

The way we influence those results is by locking dice we like into place.

The mage has a super powerful spell, so if you were playing as a mage you could click any bolt dice to lock them into place and ensure your ability to cast a spell later!

You then deal damage based on the number of swords you rolled. Damage is dealt by clicking on an enemy.

After damage is dealt, spells can be cast. You MUST have equal or greater mana than the listed cost of the spell to cast it.

From there we cycle through the turns, alternating between our team and the enemy.
The enemy deals us damage, aiming for the lowest health first, unless we have a knight on our side. If they are heavily damaged they will also try to heal.

If we defeat them, their leader joins our team. 
If we lose, we are sent back a square and our move counter would go up one.

Happy questing!


## Author
David Brennan | david.brennan@flatironschool.com

## License
Copyright 2018

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Acknowledgments
Thank you to our classmates and instructors at the Flatiron School in New York, New York.
