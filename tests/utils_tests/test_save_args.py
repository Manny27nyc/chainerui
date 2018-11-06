import argparse
import json
import os

from chainerui.utils import save_args


def test_save_args_dict(func_dir):
    out_path = os.path.join(func_dir, 'result')
    conditions = {
        'int': 1, 'float': 0.1, 'str': 'foo',
        'inner': {'int': 1}, 'array': ['boo']
    }
    save_args(conditions, out_path)

    args_path = os.path.join(out_path, 'args')
    assert os.path.exists(args_path)

    with open(args_path) as f:
        target = json.load(f)

    assert len(target) == 5
    assert target['int'] == 1
    assert target['float'] == 0.1
    assert target['str'] == 'foo'
    assert target['inner'] == {'int': 1}
    assert target['array'] == ['boo']


def _create_parser():
    parser = argparse.ArgumentParser()
    parser.add_argument('-i', type=int)
    parser.add_argument('-s')
    parser.add_argument('-a', nargs='+', type=int)
    return parser


def test_save_args_argparse(func_dir):
    out_path = os.path.join(func_dir, 'result2')
    parser = _create_parser()
    args = parser.parse_args(['-s', 'foo', '-i', '-1', '-a', '0', '100'])
    save_args(args, out_path)

    args_path = os.path.join(out_path, 'args')
    assert os.path.exists(args_path)

    with open(args_path) as f:
        target = json.load(f)
    assert len(target) == 3
    assert target['i'] == -1
    assert target['s'] == 'foo'
    assert target['a'] == [0, 100]
