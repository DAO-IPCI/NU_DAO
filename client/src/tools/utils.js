export const toDec = num => {
  const nsign = Math.sign(num);
  num = Math.abs(num);
  if (/\d+\.?\d*e[+-]*\d+/i.test(num)) {
    const zero = '0';
    const parts = String(num)
      .toLowerCase()
      .split('e');
    const e = parts.pop();
    let l = Math.abs(e);
    const sign = e / l;
    const coeff_array = parts[0].split('.');
    if (sign === -1) {
      l = l - coeff_array[0].length;
      if (l < 0) {
        num =
          coeff_array[0].slice(0, l) +
          '.' +
          coeff_array[0].slice(l) +
          (coeff_array.length === 2 ? coeff_array[1] : '');
      } else {
        num = zero + '.' + new Array(l + 1).join(zero) + coeff_array.join('');
      }
    } else {
      const dec = coeff_array[1];
      if (dec) l = l - dec.length;
      if (l < 0) {
        num = coeff_array[0] + dec.slice(0, l) + '.' + dec.slice(l);
      } else {
        num = coeff_array.join('') + new Array(l + 1).join(zero);
      }
    }
  }
  return nsign < 0 ? '-' + num : num;
};

export const urlExplorer = (address, type = 'address', chainid = 1) => {
  let domain = 'etherscan.io';
  if (type === '') {
    type = 'address';
  }
  if (chainid === 4451) {
    domain = 'explorer.aira.life';
    if (type === 'address') {
      type = 'addr';
    }
  } else {
    let chain = '';
    if (chainid === 4) {
      chain = 'rinkeby.';
    }
    domain = chain + domain;
  }
  return `https://${domain}/${type}/${address}`;
};

export const urlIpfs = (hash, type = 'ipfs') => {
  const domain = 'ipfs.io';
  if (type === '') {
    type = 'ipfs';
  }
  return `https://${domain}/${type}/${hash}`;
};
