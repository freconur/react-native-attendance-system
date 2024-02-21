import { View, Text, Modal, Pressable } from 'react-native'
import React from 'react'
import { styles } from './styles/justificationMotivoModal'
import { useGlobalContext } from '../featues/context'
import useRegistroAsistencias from '../featues/hooks/useRegistroAsistencias'


const JustificationMovitoModal = () => {
  const { showJustificacionMotivo } = useRegistroAsistencias()
  const { justificacionMotivoModal, studentDataConfirmation } = useGlobalContext()
  return (
    <Modal
      visible={justificacionMotivoModal}
      animationType='slide'
      presentationStyle='pageSheet'
    >
      <View style={styles.justificationModal}>

        <Text style={styles.warningSaleModalText}>Motivo de falta</Text>
        <View style={styles.estadoContainer}>
          <Text style={styles.estadoText}>Estado:</Text>
          <Text style={styles.estado}>{studentDataConfirmation?.arrivalTime}</Text>
        </View>
        <Text style={styles.justification}>Motivo: {studentDataConfirmation?.justificationMotive}</Text>
        <Pressable onPress={() => showJustificacionMotivo(justificacionMotivoModal)}><Text style={styles.closeMotivoJustification}>cerrar</Text></Pressable>
      </View>
    </Modal>
  )
}

export default JustificationMovitoModal