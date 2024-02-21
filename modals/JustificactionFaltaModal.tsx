import { View, Text, Modal, Pressable, ActivityIndicator, TextInput } from 'react-native'
import { styles } from './styles/justificactionFaltaStyles'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../featues/context'
import useRegistroAsistencias from '../featues/hooks/useRegistroAsistencias'


interface Props {
  date: number,
  dniStudent: string
}
const JustificactionFaltaModal = ({ date, dniStudent }: Props) => {
  const { justificacionFaltaModal, loadingConfirmationJustification } = useGlobalContext()
  const [justificationText, SetJustificationText] = useState("");
  const { showJustificaconFaltaModal, justificarFalta } = useRegistroAsistencias()
  const [confirmation, setConfirmation] = useState(false)
  const [activeButtonJustification, setActiveButtonJustification] = useState(false)
  useEffect(() => {
    if (justificationText.length > 10) {
      setActiveButtonJustification(true)
    } else{
      setActiveButtonJustification(false)
    }
  }, [justificationText])
  return (
    <Modal
      visible={justificacionFaltaModal}
      animationType='slide'
      presentationStyle='pageSheet'
    >
      <View style={styles.justificationModal}>
        {
          confirmation ?
            loadingConfirmationJustification ?
              <View>
                <ActivityIndicator animating={true} color="#624bff" />
                <Text style={styles.loader}>guardando...</Text>
              </View>
              :
              <>
                <Text style={styles.warningSaleModalText}>Estas seguro que quieres justificar la falta del estudiante?</Text>
                <View style={styles.containerButtons}>
                  <Pressable onPress={() => setConfirmation(!confirmation)} >
                    <Text style={styles.cancelJustiticationText}>NO</Text>
                  </Pressable>
                  <Pressable onPress={() => justificarFalta(dniStudent, `${date}`, justificationText)} >
                    {/* <View style={styles.cancelJustiticationText}> */}
                    <Text style={styles.agreeJustificationText}>SI</Text>
                    {/* </View> */}
                  </Pressable>

                </View>
              </>
            :
            <View style={styles.container}>
              <Text style={styles.warningSaleModalText}>Justificacion de falta de estudiante</Text>
              <Text style={styles.textLabel}>Motivo:</Text>
              <TextInput
                value={justificationText}
                style={styles.input}
                placeholder='motivo de falta'
                autoCapitalize="none"
                onChangeText={(text) => SetJustificationText(text)}
              />
              <View style={styles.containerButtons}>
                <Pressable onPress={() => showJustificaconFaltaModal(justificacionFaltaModal)} >
                  <Text style={styles.cancelJustiticationText}>cancelar</Text>
                </Pressable>
                <Pressable disabled={activeButtonJustification ? false : true} onPress={() => setConfirmation(!confirmation)} >
                  {/* <View style={styles.cancelJustiticationText}> */}
                  <Text style={justificationText.length > 10 ? styles.agreeJustificationText : styles.agreeJustificationTextDisabled}>justificar</Text>
                  {/* </View> */}
                </Pressable>

              </View>
            </View>

        }
      </View>
    </Modal>
  )
}

export default JustificactionFaltaModal