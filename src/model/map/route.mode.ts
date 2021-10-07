export class RouteModel {
  static totalDurationDistance(
    legs: globalThis.google.maps.DirectionsLeg[],
  ):{
    duration: string,
    distance: string,
  } {
    let durationText = ''; // 時間
    let distanceText = ''; // 距離

    /*
    * durationのvalueは「秒」
    * distanceのvalueは「メートル」
    */
    // console.groupCollapsed('LEGS: ', legs);
    // console.groupEnd();

    // ----------------------------------------------------------------------------

    let totalSeconds = 0; // 合計時間
    let totalMinutes = 0;
    let totalHours = 0;

    let minute: number = 0;
    let hour: number = 0;
    let day: number = 0;

    let totalMeter: number = 0;
    let totalKilometer: number = 0;

    legs.forEach((v) => {
      // 合計秒数を求める
      totalSeconds += v.duration?.value ?? 0;
      // 合計距離(m)を求める
      totalMeter += v.distance?.value ?? 0;
    });

    /*
     * 総移動時間
     */
    // console.groupCollapsed('総移動時間: ', totalSeconds, '秒');

    // 合計秒数の四捨五入から「分」を計算
    totalMinutes = Math.round(totalSeconds / 60);
    // console.log(' L 合計', totalMinutes, '分 (秒数を四捨五入)');

    /* 1時間以上の場合 */
    if (totalMinutes > 59) {
      totalHours = Math.floor(totalMinutes / 60);
      minute = totalMinutes % 60;
      if /* 24時間以内の場合 */ (totalHours < 25) {
        hour = totalHours;
        // console.log('   L 合計', hour, '時間 ', minute, '分');
      } /* 1日以上の場合 */ else {
        day = Math.floor(totalHours / 24);
        hour = totalHours % 24;
        // console.log('   L 合計', day, '日 ', hour, '時間');
        // console.log('   L 合計', day, '日 ', hour, '時間 ', totalMinutes % 60, '分 (厳密には)');
      }
    } /* 1時間以内の場合 */ else {
      minute = totalMinutes;
      // console.log('   → 合計', minute, '分');
    }

    // console.log('day', 'hour, minute', day, hour, minute);

    if (day) {
      durationText = `${day} 日 ${hour} 時間`;
    } else if (hour) {
      durationText = `${hour} 時間 ${minute} 分`;
    } else {
      durationText = `${minute} 分`;
    }

    // console.groupEnd();

    /*
     * 総移動距離
     * 100m未満の場合はそのままの数値でメートル表示し、100m以上ではkm換算
     * 100m(0.1km)〜100km未満では小数点第二を四捨五入し、小数点第一まで表示
     * 100km以上では小数点第一を四捨五入し、整数で表示(小数点第二の四捨五入はやらない)
     */
    // console.groupCollapsed('総移動距離: ', totalMeter, 'M');

    /* 100m未満 */
    if (totalMeter < 100) {
      distanceText = `${totalMeter} m`;
      // console.log('合計', totalMeter);
    } /* 100m以上 */ else {
      totalKilometer = totalMeter < 100000
        ? Math.round((totalMeter / 1000) * 10) / 10
        : Math.round((totalMeter / 1000));
      // console.log(' L 合計', totalKilometer, 'km');
      distanceText = `${totalKilometer} km`;

      // 100km未満で小数が0の場合は「.0」まで付ける
      if (totalKilometer < 100 && !(totalKilometer - Math.floor(totalKilometer))) {
        distanceText = `${totalKilometer}.0 km`;
      }

      // console.groupEnd();
    }

    // console.groupCollapsed('結果');
    // console.log('時間 >>> ', durationText);
    // console.log('距離 >>> ', distanceText);

    return ({
      duration: durationText,
      distance: distanceText,
    });
  }
}
