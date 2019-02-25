# TODO

> Ubiquitous language:
> - **Initiative**: The value ordering *Elements* in an initiative *Table*.
>
> - **Table**: the initiative table representing all *Elements* in order of initiative value
> 
> - **Element**: can be a creature, an event,... represent an item in the initiative *Table*
> 
> - **Turn**: Each *Element* make actions during its *Turn*, then passes its turn to the next *Element* in the *Table*, which can then proceed to make its actions.
> 
> - **Round**: When all *Elements* from the *Table* have ended their turn, we reset the *Table* initiative order, and proceed to a new *Round* for, where all *Elements* can make a new *Turn*.

## Initiative table

- [x] Create a new initiative *Table*
- [x] Add *Element* to *Table*
- [x] Pass *Element* turn
- [x] Iterate over next *Elements* in initiative order
- [x] Remove *Element* from *Table*
- [x] Iterate over *Rounds*
- [x] Add event triggered on specified *Round* on *Table*
- [x] Trigger event on *Round* by initiative order
- [x] Remove event from *Table*
- [x] Keep tracks of removed *Element*
- [] Add Multiple *Element* of the same type to *Table* at once

## Creatures and Players

- [] Track *Elements* hitpoints
- [] Auto remove *Elements* when they have no more hitpoints
- [] Track usage of *Action*, *Bonus Action* and *Reaction*
- [] Handle timed *Conditions* and *Effects* (dodge/blinded/..., at start/end of *Turn* ) on *Elements*

