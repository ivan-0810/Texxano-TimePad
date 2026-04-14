import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from '@expo/vector-icons';

// Redux 
import http from '../../services/http'
// Redux 

// Components
import HeaderDashboard from './components/HeaderDashboard'
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";
import ModalCreateProject from "../Project/components/ModalCreateProject";
// Components
import { globalStyles } from "../../asset/style/globalStyles"
import ItemProject from "../Project/components/ItemProject/ItemProject";
import HelloStiker from "./components/HelloStiker";
import { generateUUID } from "../../utils/variousHelpers";
import AppContainerClean from "../../components/AppContainerClean";
import UpdateBanner from "../../components/UpdateBanner";

const Dashboard = ({ navigation }) => {

    const state = useSelector(state => state)
    const favoriteProject = state.favoriteProject
    const dispatch = useDispatch();
    const projectState = state.project
    const muteUnMuteNotifications = state.muteUnMuteNotifications
    const userId = state.userDataRole?.userId || null;

    const [dataResponse, setDataResponse] = useState([]);
    const [search, setSearch] = useState("");
    const [dataLength, setDataLength] = useState(false);
    const [requestApi, setRequestApi] = useState(true);

    const [pageIndex, setPageIndex] = useState(null);
    const [totalPages, setTotalPages] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setpagination] = useState(0);

    useEffect(() => {
        if (projectState || muteUnMuteNotifications) {
            http.get(`/projects?page=${currentPage}&search=${search}`)
                .then((data) => {
                    if (data && data.list) {
                        setPageIndex(data.pageIndex)
                        setTotalPages(data.totalPages)
                        setRequestApi(false)
                        setDataResponse(data.list);
                        setDataLength(data.list.length === 0);
                    } else {
                        console.error('Dashboard: Invalid API response format:', data);
                        setRequestApi(false)
                        setDataResponse([]);
                        setDataLength(true);
                    }
                })
                .catch((error) => {
                    console.error('Dashboard: API call failed:', error);
                    setRequestApi(false)
                    setDataResponse([]);
                    setDataLength(true);
                })
        }

    }, [ projectState, favoriteProject, currentPage, search, muteUnMuteNotifications ]);


    useEffect(() => {
        if (dataLength && currentPage > 1) {
            setCurrentPage(null)
        }
    }, [dataLength, currentPage]);

    return (
        <AppContainerClean location={'Dashboard'}  pagination={pagination} >
            <View style={{ padding: 20 }}>
                <TouchableOpacity 
                    style={styles.timeWizardButton}
                    onPress={() => navigation.navigate('TimeWizard')}
                >
                    <Ionicons name="time-outline" size={32} color="#fff" />
                    <Text style={styles.buttonText}>Start Time Tracking Wizard</Text>
                    <Ionicons name="arrow-forward" size={24} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.dashboardButton}
                    onPress={() => navigation.navigate('TimeTrackingDashboard')}
                >
                    <Ionicons name="timer-outline" size={32} color="#fff" />
                    <Text style={styles.buttonText}>View Active Tracking Sessions</Text>
                    <Ionicons name="arrow-forward" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
            {/* <HelloStiker />
            <HeaderDashboard location={'Dashboard'} />
            <View style={{ flexDirection: "row", alignItems: 'center', minHeight: 37 }}>
                <Text style={globalStyles.screenTitle}>
                    <FormattedMessage id="dashboard.title" />
                </Text>
                <ModalCreateProject />
            </View>
            <Search
                onSearch={value => { setSearch(value) }}
                onPageChange={page => setCurrentPage(page)}
                placeholder={"projects.filter.title"}
            />
            <UpdateBanner /> */}
            {/* <View style={globalStyles.box}>
                <FlatList
                    data={dataResponse}
                    renderItem={({ item }) => {
                        return (
                            <View  >
                                <ItemProject data={item} navigateFrom={"Dashboard"} />
                            </View>
                        )
                    }}
                    keyExtractor={() => generateUUID(43)}
                />
                {requestApi ? (<ActivityIndicator size="large" color="#6c757d" />) : (<></>)}
                {dataLength ? (<Text style={globalStyles.dataLength}><FormattedMessage id="projects.list.noItems" /> </Text>) : (<></>)}
            </View> */}
            {/* {!dataLength ? (
                <Pagination
                    onPageChange={page => setCurrentPage(page)}
                    currentPage={pageIndex}
                    total={totalPages}
                    checkTokenExpPagination={e => setpagination(e)}
                />
            ) : (<></>)} */}

        </AppContainerClean>
    )
}

const styles = StyleSheet.create({
    timeWizardButton: {
        backgroundColor: '#FF9800',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderRadius: 12,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    dashboardButton: {
        backgroundColor: '#4CAF50',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderRadius: 12,
        marginTop: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        flex: 1,
        marginLeft: 16,
    },
});

export default Dashboard
