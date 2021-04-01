import { Dinero } from '../types';
import { maximum as max } from '../utils';
import { Dependencies } from './types';

export type MaximumDependencies<
  TAmount,
  TDinero extends Dinero<TAmount>
> = Dependencies<TAmount, TDinero, 'compare'>;

export function maximum<TAmount, TDinero extends Dinero<TAmount>>({
  factory,
  calculator,
}: MaximumDependencies<TAmount, TDinero>) {
  const maxFn = max(calculator);

  return function _maximum(dineroObjects: readonly TDinero[]) {
    const [firstDinero] = dineroObjects;
    const { currency, scale } = firstDinero.toJSON();

    const amount = maxFn(
      dineroObjects.map((subject) => {
        const { amount: subjectAmount } = subject.toJSON();

        return subjectAmount;
      })
    );

    return factory({
      amount,
      currency,
      scale,
    });
  };
}
