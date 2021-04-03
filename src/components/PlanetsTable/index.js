import React, { useEffect, useReducer } from 'react';
import { Dimmer, Loader, Table } from 'semantic-ui-react';
import { sortBy } from 'lodash';

import { normalizeTerrains } from '../../utils';

const {
    Body: TableBody,
    Cell: TableCell,
    Header: TableHeader,
    HeaderCell: TableHeaderCell,
    Row: TableRow
} = Table;

const planetsReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_SORT':
            if (state.column === action.column) {
                return {
                    ...state,
                    data: state.data.slice().reverse(),
                    direction:
                    state.direction === 'ascending' ? 'descending' : 'ascending',
                };
            }
    
            return {
                column: action.column,
                data: sortBy(state.data, [action.column]),
                direction: 'ascending',
            };

        case 'UPDATE_PLANETS': 

            return {
                ...state,
                data: action.planets,
            };
        default:
            throw new Error();
    }
  }

const PlanetsTable = ({planets}) => {
    const [state, dispatch] = useReducer(planetsReducer, {
        column: null,
        data: planets,
        direction: null,
    });
    const { column, data, direction } = state;

    useEffect(() => {
        if (planets) {
            dispatch({ type: 'UPDATE_PLANETS', planets });
        }
    }, [planets]);

    return (
        <>
            <Table sortable celled fixed>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell
                            sorted={column === 'name' ? direction : null}
                            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'name' })}
                        >
                            Name
                        </TableHeaderCell>
                        <TableHeaderCell
                            sorted={column === 'terrain' ? direction : null}
                            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'terrain' })}
                        >
                            Terrain
                        </TableHeaderCell>
                        <TableHeaderCell
                            sorted={column === 'diameter' ? direction : null}
                            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'diameter' })}
                        >
                            Diameter
                        </TableHeaderCell>
                        <TableHeaderCell
                            sorted={column === 'orbital_period' ? direction : null}
                            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'orbital_period' })}
                        >
                            Orbital Period
                        </TableHeaderCell>
                        <TableHeaderCell
                            sorted={column === 'rotation_period' ? direction : null}
                            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'rotation_period' })}
                        >
                            Rotation Period
                        </TableHeaderCell>
                        <TableHeaderCell
                            sorted={column === 'gravity' ? direction : null}
                            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'gravity' })}
                        >
                            Gravity
                        </TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map(({ diameter, gravity, name, orbital_period, rotation_period, terrain }) => (
                        <TableRow key={name}>
                            <TableCell>{name}</TableCell>
                            <TableCell>{normalizeTerrains(terrain)}</TableCell>
                            <TableCell>{`${diameter} km`}</TableCell>
                            <TableCell>{`${orbital_period} hours`}</TableCell>
                            <TableCell>{`${rotation_period} hours`}</TableCell>
                            <TableCell>{gravity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Dimmer active={!data.length} inverted>
                <Loader />
            </Dimmer>
        </>
    );
}

export default PlanetsTable;
