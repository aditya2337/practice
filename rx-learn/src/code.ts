import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/operators';

const observable1 = Observable.create((obsever:any) => {
  obsever.next('Hey guys');
})

const observable2 = Observable.create((obsever:any) => {
  obsever.next('How is it going');
});

const newObs = merge(observable1, observable2);

newObs.subscribe((x:any) => addItem(x));

function addItem(val:any) {
  const node = document.createElement("li");
  const textnode = document.createTextNode(val);
  node.appendChild(textnode);
  document.getElementById("output").appendChild(node);
}
