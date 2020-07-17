import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
} from 'react-native';
import SplashScreen from '../components/SplashScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {authenticationChange} from '../redux/action';

class DashboardMentor extends React.Component {
  state = {
    boxIcon: [
      {
        iconName: 'university',
        size: 30,
        color: 'rgb(0,184,150)',
        title: 'Buat SOP',
      },
      {
        iconName: 'file',
        size: 30,
        color: 'rgb(0,184,150)',
        title: 'Buat Kurikulum',
      },
      {
        iconName: 'pencil',
        size: 30,
        color: 'rgb(0,184,150)',
        title: 'Buat Materi Pembelajaran',
      },
      {
        iconName: 'tags',
        size: 30,
        color: 'rgb(0,184,150)',
        title: 'Buat Standar Kompetensi',
      },
      {
        iconName: 'book',
        size: 30,
        color: 'rgb(0,184,150)',
        title: 'Buat Tugas Harian',
      },
      {
        iconName: 'delicious',
        size: 30,
        color: 'rgb(0,184,150)',
        title: 'Buat Mini Project',
      },
      {
        iconName: 'play',
        size: 30,
        color: 'rgb(0,184,150)',
        title: 'Buat Video Check',
      },
      {
        iconName: 'group',
        size: 30,
        color: 'rgb(0,184,150)',
        title: 'Daftar Santri',
      },
      {
        iconName: 'qrcode',
        size: 30,
        color: 'rgb(0,184,150)',
        title: 'QR Scanner',
      },
      {
        iconName: 'sign-out',
        size: 30,
        color: 'rgb(0,184,150)',
        title: 'Keluar',
      },
    ],
  };
  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    AsyncStorage.getItem('data').then(value => {
      let data = {
        id: JSON.parse(value).id,
        token: JSON.parse(value).token,
        role: JSON.parse(value).role,
      };
      this.props.authenticationChange(data);
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }
  cautionExit = () => {
    Alert.alert(
      'Keluar Akun',
      'Apa anda yakin ingin keluar ?',
      [
        {
          text: 'Tidak',
          onPress: () => {
            return false;
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            AsyncStorage.removeItem('data');
            this.props.navigation.navigate('DashboardUtama');
          },
        },
      ],
      {cancelable: false},
    );
  };
  changeScreen = index => {
    switch (index) {
      case 0:
        this.props.navigation.navigate('BuatSOP');
        break;
      case 1:
        this.props.navigation.navigate('BuatKurikulum');
        break;
      case 2:
        this.props.navigation.navigate('BuatMateriPembelajaran');
        break;
      case 3:
        this.props.navigation.navigate('BuatStandarKompetensi');
        break;
      case 4:
        this.props.navigation.navigate('BuatTugasHarian');
        break;
      case 5:
        this.props.navigation.navigate('BuatMiniProject');
        break;
      case 6:
        this.props.navigation.navigate('BuatVideoCheck');
        break;
      case 7:
        this.props.navigation.navigate('DaftarSantri');
        break;
      case 8:
        this.props.navigation.navigate('QRScanner');
        break;
      case 9:
        this.cautionExit();
        break;
      default:
        alert('lainnya');
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.dashboardTemplate}>
          <Image
            source={require('../assets/images/banner.png')}
            style={styles.banner}
          />
          <View style={styles.iconTemplates}>
            <View style={styles.dashboardTitleBox}>
              <Text style={styles.dashboardTitle}>DASHBOARD MENTOR</Text>
            </View>
            {this.state.boxIcon.map((value, key) => {
              return (
                <View key={key} style={styles.iconField}>
                  <TouchableOpacity
                    onPress={() => this.changeScreen(key)}
                    delayPressIn={10}
                    activeOpacity={0.5}>
                    <View
                      style={{
                        ...styles.boxIcon,
                        borderColor: `${value.color}`,
                      }}>
                      <Icon
                        name={value.iconName}
                        size={value.size}
                        color={value.color}
                      />
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.textIcon}>{value.title}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  const {authentication} = state.reducers;
  return {authentication};
};

export default connect(
  mapStateToProps,
  {authenticationChange},
)(DashboardMentor);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(237, 237, 235)',
  },
  dashboardTemplate: {
    flex: 1,
  },
  iconTemplates: {
    padding: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    marginTop: 15,
  },
  iconField: {
    height: 80,
    width: 80,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  boxIcon: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'rgb(0, 184, 150)',
    marginBottom: 3,
  },
  textIcon: {
    textAlign: 'center',
    fontSize: 12,
  },
  dashboardTitleBox: {
    width: '100%',
  },
  dashboardTitle: {
    margin: 5,
    fontWeight: 'bold',
    color: 'grey',
    fontSize: 14,
  },
  banner: {
    height: '30%',
    width: '100%',
  },
});
