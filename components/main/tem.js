userGoalsRef.orderBy('creation', 'desc')
    .get().then((snapshot) => {
      //if still not work, change this to for loop
        //map seperated documents into little docs filter((doc) => doc.data().done == false)
        let posts = snapshot.docs.map(doc => {
            const data = doc.data();
            //console.log(data)

              if (data.lastStampDate == today) {
                  const id = doc.id;
                  return {id, ...data}
              } else {
                setGoalsList([])

                const id = doc.id;
                let tempoList = data.subGoals;

                for (i = 0; i < tempoList.length; i ++) {
                  tempoList[i].done = false;
                }

                firebase.firestore().collection('goals').doc(firebase.auth().currentUser.uid)
                .collection('userGoals').doc(id)
                .update({
                    "subGoals": tempoList,
                    "lastStampDate": new Date().setHours(0,0,0,0),
                }).then((function() {
                    console.log('Success updating new timstamp')
                      
                }))


                 //update in user dailystreak time stamp

                 firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid)
                 .update({
                   "dailyStreak": 0,
                   "lastStampDate": new Date().setHours(0,0,0,0) 
                 }).then((function() {
                     console.log('Success reset streak')
                 }))
                 
                 //get new data again
                 
                 firebase.firestore().collection('goals').doc(firebase.auth().currentUser.uid).collection('userGoals')
                 .orderBy('creation', 'desc')
                 .get().then((snapshot) => {
                     //map seperated documents into little docs
                     let temPosts = snapshot.docs.map(doc => {
                         const data = doc.data();
                         console.log(data)
                         const id = doc.id;
                         return {id, ...data}
                     })
                     setTemGoalsList([...temPosts])
                     setGoalsList([...temPosts]);
                     console.log(temPosts)
                     console.log('temPost'+goalsList)
                     console.log(temGoalsList)
                   })

                   //props.navigation.navigate("TodoHome")
              //should return here 
                return;
          } 
        //}    
        })
        //console.log([...posts])
        setGoalsList([...posts]);
        


    })