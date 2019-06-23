import {TestActions} from '@/modules/TestModule';
import {RootState} from '@/store';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const mapStateToProps = (state: RootState) => ({
    name: state.test.name,
    value: state.test.counter.value
});

const mapDispatchToProps = (dispatch: any) => ({
    ...bindActionCreators(TestActions, dispatch)
});

export type propType =
    ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;


export default connect(mapStateToProps, mapDispatchToProps);
